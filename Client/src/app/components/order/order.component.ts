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
  newOrderId: number;
  state: string = "New";
  updating: boolean = false;
  model = new OrderModel();
  salesPerson = new SalesPersonModel();
  collections: CollectionModel[] = [];
  date: Date;
  customerResults: CustomerModel[] = [];
  selectedCustomer = new CustomerModel();
  selectedSalesPerson = new SalesPersonModel();
  salesPersonResults:SalesPersonModel[] = [];
 


  constructor(private service: OrderService, 
              private collection_service: CollectionService,
              private customer_service: CustomerService,
              private sales_service: SalesPersonService,
              private router: Router, 
              private route: ActivatedRoute,
              private toastr: ToastsManager) { }

  ngOnInit() {
//Subbed for now until login
    this.getSalesPerson(2)

    //this.getCollections();

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
        return this.collections = result;
      });
  }

  
  prepareModel() {
    this.model.dateCreated = new Date();
    //time zone out by 2 hours
    this.model.dateCreated.setHours(this.model.dateCreated.getHours() + 2);
    this.model.customerId = this.selectedCustomer.id;
    //subbed
    //this.model.salesPersonId = this.selectedSalesPerson.id;
    this.model.salesPersonId = 2;
    
  }
  
  create(){
    this.prepareModel();
    this.newOrderId = 0;

    this.service.post(this.model)
      .subscribe(result => {
        this.createCollections(result.id);
        //this.router.navigate(['/orders']);
        this.toastr.success("Successfully added new order", 'Success');
      }, err => {
        this.toastr.error('Could not process request', 'An error occurred');
        //this.cancel();
      });

  }

  createCollections(id:number){
    this.collections.forEach(element => {
      element.orderId = id;
      //time zone out by 2 hours
      element.collectionDate.setHours(element.collectionDate.getHours() + 2);
    });

    this.collection_service.post(this.collections)
      .subscribe(result => {
        this.router.navigate(['/orders']);
        this.toastr.success("Successfully collection dates added", 'Success');
      }, err => {
        this.toastr.error('Could not process request', 'An error occurred');
        this.cancel();
      });

  }

  update(){

    this.service.put(this.model)
      .subscribe(result => {
        this.toastr.success("Successfully updated order details", 'Success');
        this.router.navigate(['/customers']);
      }, err => {
        this.toastr.error('Could not process request', 'An error occurred');
        this.cancel();
      });
  }

  cancel(){
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
        });
    }

    filterListSales(query:any, items: SalesPersonModel[]):any[] {
      let filtered : SalesPersonModel[] = [];
      for(let i = 0; i < items.length; i++) {
          let element = items[i];
          if(element.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(element);
          }
      }
      return filtered;
  }

    filterSalesPersonMultiple(event:any) {
      let query = event.query;
      this.sales_service.getAll().subscribe(result => {
      this.salesPersonResults = this.filterListSales(query, result);
      });
  }

  getSalesPerson(id:number) {
         this.sales_service.get(id).subscribe(result => {
        return this.salesPerson = result;
        });
    }
      
  addCollection() {
    this.collections.push(new CollectionModel());
  }

  removeCollection(index: number) {
    this.collections.splice(index, 1);
  }
}
