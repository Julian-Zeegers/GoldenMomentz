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

  
  constructor(private service: CustomerService, 
              private collection_service: CollectionService,
              private router: Router,) { }

  ngOnInit() {
    this.getAll();
    
  }

  getAll(){
    this.collection_service.getAll()
      .subscribe(result => {
        return this.collections = result
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

}
