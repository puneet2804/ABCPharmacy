import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Medicine, MedicineDto } from '../../models';
import { catchError, finalize, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-medicines',
  imports: [CommonModule, FormsModule],
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss']
})
// ...
export class MedicinesComponent implements OnInit {
  items: Medicine[] = [];
  loading = false;
  salesBusy = false;
  search = '';

  private todayYYYYMMDD() {
    const d = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  }

  form: MedicineDto = {
    fullName: '',
    brand: '',
    notes: '',
    expiryDate: this.todayYYYYMMDD(),   // yyyy-MM-dd for <input type="date">
    quantity: 0,
    price: 0
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  /** Load medicines (optionally with search term) */
  load(term?: string): void {
    const q = (term ?? this.search ?? '').trim() || undefined;
    this.loading = true;

    this.api.listMedicines(q).pipe(
      catchError(err => {
        console.error('Load failed', err);
        alert(typeof err?.error === 'string' ? err.error : 'Failed to load medicines.');
        return of<Medicine[]>([]);
      }),
      finalize(() => this.loading = false)
    )
    .subscribe(data => this.items = data);
  }

  onSearchChange(): void {
    this.load();
  }

  add(): void {
    const dto: MedicineDto = {
      fullName: this.form.fullName,
      brand: this.form.brand || '',
      notes: this.form.notes || '',
      expiryDate: new Date(this.form.expiryDate).toISOString(),
      quantity: Number(this.form.quantity || 0),
      price: Number(this.form.price || 0)
    };

    this.api.addMedicine(dto).pipe(
      catchError(err => {
        console.error('Add failed', err);
        alert(typeof err?.error === 'string' ? err.error : 'Failed to add medicine.');
        return of(null);
      })
    )
    .subscribe(res => {
      if (!res) return;
      this.form = {
        fullName: '',
        brand: '',
        notes: '',
        expiryDate: this.todayYYYYMMDD(),
        quantity: 0,
        price: 0
      };
      this.load();
    });
  }

  sell(m: Medicine, qtyStr: string): void {
    const qty = Number(qtyStr);
    if (!qty || qty < 1) return;

    this.salesBusy = true;
    this.api.makeSale(m.id, qty).pipe(
      catchError(err => {
        console.error('Sale failed', err);
        alert(typeof err?.error === 'string' ? err.error : 'Failed to record sale.');
        return of(null);
      }),
      finalize(() => this.salesBusy = false)
    )
    .subscribe(ok => ok && this.load());
  }

  // helper used by template for color rules
  daysUntil(dateIso: string): number {
    const d = new Date(dateIso).getTime();
    const t = new Date().getTime();
    return Math.ceil((d - t) / (1000*60*60*24));
  }
}