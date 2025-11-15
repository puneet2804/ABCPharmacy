import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { SaleRecord } from '../../models';
import { catchError, of } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-sales',
  imports: [CommonModule],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  items: SaleRecord[] = [];
  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.api.listSales()
      .pipe(
        catchError(err => {
          console.error('Sales load failed', err);
          alert(typeof err?.error === 'string' ? err.error : 'Failed to load sales.');
          return of<SaleRecord[]>([]);
        })
      )
      .subscribe(data => {
        this.items = data;
        this.loading = false;
      });
  }

  total(s: SaleRecord): number {
    return Number((s.quantity * s.unitPrice).toFixed(2));
  }
}