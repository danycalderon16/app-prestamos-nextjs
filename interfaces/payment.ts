

export interface Payment {
  fecha: string;
  id:    number;
  abono: number;
  saldo: number;
}
export interface CreatePayment {
  fecha: Date;
  abono: number;
}
