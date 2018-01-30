import { Component, OnInit } from '@angular/core';
import { CustomerService} from '../../../services';
import { CustomerModel} from '../../../models';
import { Router } from '@angular/router';
import { DataTableModule, SharedModule, TabViewModule } from 'primeng/primeng';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: []
})
export class CustomerListComponent implements OnInit {
  addCustomer = new CustomerModel();
  updateCustomer = new CustomerModel();
  customers: CustomerModel[] = [];
  
  
  constructor(private service: CustomerService, 
              private router: Router,) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.service.getAll()
      .subscribe(result => {
        return this.customers = result
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


}
