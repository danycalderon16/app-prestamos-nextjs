

export interface Payment {
  fecha: Date;
  id:    number;
  abono: number;
  saldo: number;
}
export interface CreatePayment {
  fecha: Date;
  abono: number;
}
