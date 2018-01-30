import { Component, OnInit } from '@angular/core';
import { OrderService} from '../../../services';
import { OrderModel } from '../../../models';
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
  
  
  constructor(private service: OrderService, 
              private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.service.getAll()
      .subscribe(result => {
        console.log("Update2: "+JSON.stringify(result));
        return this.orders = result;
        
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



}
