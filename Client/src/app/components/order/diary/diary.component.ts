import { Component, OnInit } from '@angular/core';
import { CustomerService, OrderService, CollectionService} from '../../../services';
import { CustomerModel,OrderModel, CollectionModel} from '../../../models';
import { Router } from '@angular/router';
import { DataTableModule, SharedModule, TabViewModule } from 'primeng/primeng';
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary.component.html',
  styleUrls: []
})
export class DiaryComponent implements OnInit {
  addCustomer = new CustomerModel();
  updateCustomer = new CustomerModel();
  collections: CollectionModel[] = [];
  selectedCollections: CollectionModel[] = [];
  date = new Date()
  orders: OrderModel[] = [];

  
  constructor(private service: CustomerService, 
              private collection_service: CollectionService,
              private order_service: OrderService,
              private router: Router,) { }

  ngOnInit() {
    this.getAll();
    this.getAllOrders();
    
  }

  getAll(){
    this.collection_service.getAll()
      .subscribe(result => {
        return this.collections = result
      });
  }

  getAllOrders(){
    this.order_service.getAll()
      .subscribe(result => {
        return this.orders = result
      });
  }
  
  get(id: number){
    this.service.get(id)
    .subscribe(result => {
      return this.updateCustomer = result
    });
  }
  update(customer: CustomerModel): void {
    this.updateCustomer = customer;
    this.router.navigate(['/customers', customer.id]);
  }

  onDateChanged(event: Date): void {
      this.selectedCollections =[];
      for(var i = 0;i<this.collections.length;i++) 
      { 
          var creation = new Date(this.collections[i].collectionDate);
          if(this.getDate(creation) == this.getDate(event)) 
              this.selectedCollections.push(this.collections[i]);
      } 
  }

  getDate(date: Date){
    return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate(); 
  }

  updatePaid(event: any){
    console.log("HI" + JSON.stringify(event.target.checked));
  }

  payCollection(){
    
  }

  getAmountPaid(orderID: number): number{
    var amountPaid = 0;
    this.collections.forEach(collection => {
        if(collection.orderId == orderID && collection.paid == true)
        {
          amountPaid += collection.amount;
        }
      
    });
    return amountPaid;
  }

  getPurchasePrice(orderID: number): number{

    var purchasePrice = 0;
    this.orders.forEach(order => {
        if(order.id == orderID)
        {
          purchasePrice= order.purchasePrice - order.deposit;
        }
      
    });
    return purchasePrice;

  }

  getBalance(orderID: number): number{
    console.log("HI");
    return  this.getPurchasePrice(orderID) - this.getAmountPaid(orderID);
  }



}
