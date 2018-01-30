import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {AutoCompleteModule} from 'primeng/primeng';
import { ToastsManager  } from 'ng2-toastr/ng2-toastr';

import { 
  OrderModel, CollectionModel, CustomerModel, SalesPersonModel
  } from '../../models';

import { OrderService, CollectionService,CustomerService, SalesPersonService
   } from '../../services';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  idParam: number;
  state: string = "New";
  updating: boolean = false;
  model = new OrderModel();
  salesPerson = new SalesPersonModel();
  collections: CollectionModel[] = [];
  date: Date;
  customerResults: CustomerModel[] = [];
 


  constructor(private service: OrderService, 
              private collection_service: CollectionService,
              private customer_service: CustomerService,
              //private sales_service: SalesPersonService,
              private router: Router, 
              private route: ActivatedRoute,
              private toastr: ToastsManager) { }

  ngOnInit() {

    this.getCollections();

    this.route.paramMap
    .switchMap((params: ParamMap) => {
      this.idParam = +params.get('id');
      if (this.idParam > 0) {
        this.state = 'Update';
        this.updating = true;
      }
      
      return this.service.get(this.idParam);
    }).subscribe((order: OrderModel) => {
      if (order != null) {
        this.model = order;
      }
    });
  }

  getCollections(){
    this.collection_service.getAll()
      .subscribe(result => {
        
        this.collections = result;
        for(let i = 0; i <  this.collections.length; i++) {
            this.collections[i].collectionDate = new Date(this.collections[i].collectionDate);
          }
          console.log("Collections: "+JSON.stringify(this.collections));
        return this.collections = result;
      });
  }

  
  prepareModel() {
    let skillIds: number[] = [];
    
  }
  
  create(){
    //this.prepareModel();
    //this.getSalesPerson(5)
    this.model.salesPersonId = this.salesPerson.id
    console.log("Post: "+JSON.stringify(this.model));
    this.service.post(this.model)
      .subscribe(result => {
        this.router.navigate(['/orders']);
      }, err => {
        this.toastr.success("Successfully added new order", 'Success');
        this.toastr.error('Could not process request', 'An error occurred');
        this.cancel();
      });
  }

  update(){

    this.service.put(this.model)
      .subscribe(result => {
        this.toastr.success("Successfully updated order details", 'Success');
        this.router.navigate(['/customers']);
        console.log("Update"+JSON.stringify(this.model));
      }, err => {
          console.log(JSON.stringify(this.model));
        this.toastr.error('Could not process request', 'An error occurred');
        this.cancel();
      });
  }

  cancel(){
        console.log("date: "+JSON.stringify(this.date));
       this.router.navigate(['/orders']);
  }

    filterList(query:any, items: CustomerModel[]):any[] {
        let filtered : CustomerModel[] = [];
        for(let i = 0; i < items.length; i++) {
            let element = items[i];
            if(element.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(element);
            }
        }
        return filtered;
    }

    filterCustomerMultiple(event:any) {
        let query = event.query;
        this.customer_service.getAll().subscribe(result => {
        this.customerResults = this.filterList(query, result);
        console.log(JSON.stringify("Names"+JSON.stringify(this.customerResults)));
        console.log("ID: "+JSON.stringify(this.model));
        });
    }

  // getSalesPerson(id:number) {
  //        this.sales_service.get(id).subscribe(result => {
  //       return this.salesPerson = result;;
  //       });
  //   }
      
  addCollection() {
    this.collections.push(new CollectionModel());
  }

  removeCollection(index: number) {
    this.collections.splice(index, 1);
  }
}
