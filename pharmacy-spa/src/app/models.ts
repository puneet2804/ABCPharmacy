export interface Medicine {
    id: string;
    fullName: string;
    notes: string;
    expiryDate: string; // ISO
    quantity: number;
    price: number;
    brand: string;
  }
  
  export interface MedicineDto {
    fullName: string;
    notes?: string;
    expiryDate: string; // ISO
    quantity: number;
    price: number;
    brand?: string;     // <-- make sure this exists
  }
  
  export interface SaleRecord {
    id: string;
    medicineId: string;
    medicineName: string;
    quantity: number;
    unitPrice: number;
    soldAt: string; // ISO
  }