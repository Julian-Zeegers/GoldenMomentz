export class OrderModel {
    id: number;
    orderBookId: number;
    dateCreated: Date;
    purchasePrice: number;
    customerId: number;
    salesPersonId: number;
    penaltyCharge: number;
    deposit: number;
    notes: string;
}