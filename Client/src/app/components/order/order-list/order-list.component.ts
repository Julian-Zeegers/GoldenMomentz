import { Component, OnInit } from '@angular/core';
import { OrderService, CollectionService} from '../../../services';
import { OrderModel , CollectionModel} from '../../../models';
import { Router } from '@angular/router';
import { DataTableModule, SharedModule, TabViewModule } from 'primeng/primeng';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: []
})
export class OrderListComponent implements OnInit {
  updateOrder = new OrderModel();
  orders: OrderModel[] = [];
  collections: CollectionModel[] = [];
  
  
  constructor(private service: OrderService, 
              private service_collection: CollectionService,
              private router: Router) { }

  isDataAvailable:boolean = false;

  ngOnInit() {
    this.getAllCollections();
      this.getAll();
  }

  getAll(){
    
    this.service.getAll()
      .subscribe(result => {
        
        this.orders = result;
        this.getAmountPaid();
        return this.orders;
      });
  }

  getAllCollections(){
    this.service_collection.getAll()
      .subscribe(result => {
        return this.collections = result;
      });
  }
  
  get(id: number){
    this.service.get(id)
    .subscribe(result => {
      return this.updateOrder = result
    });
  }
  update(customer:OrderModel): void {
    this.updateOrder = customer;
    this.router.navigate(['/customers', customer.id]);
  }

  getAmountPaid(){
    this.orders.forEach(element => {
      element.amountPaid = this.addAmountPaid(element.id);
    });
    this.isDataAvailable = true;
    
  }

  addAmountPaid(orderId: number): number{
    var amount = 0;
    this.collections.forEach(element => {
      if(element.orderId == orderId && element.paid == true)
      {
        amount += element.amount;
      }
      
    });
    return amount;

  }



}
