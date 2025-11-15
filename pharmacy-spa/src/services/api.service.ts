import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicine, MedicineDto, SaleRecord } from '../app/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  listMedicines(name?: string): Observable<Medicine[]> {
    const url = name ? `/api/medicines?name=${encodeURIComponent(name)}` : '/api/medicines';
    return this.http.get<Medicine[]>(url);
    }

  addMedicine(dto: MedicineDto): Observable<Medicine> {
    return this.http.post<Medicine>('/api/medicines', dto);
  }

  makeSale(medicineId: string, quantity: number): Observable<SaleRecord> {
    return this.http.post<SaleRecord>('/api/sales', { medicineId, quantity });
  }

  listSales(): Observable<SaleRecord[]> {
    return this.http.get<SaleRecord[]>('/api/sales');
  }
}