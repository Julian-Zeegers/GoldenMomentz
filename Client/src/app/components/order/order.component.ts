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
        this.getCustomer(this.model.customerId);
        this.getCollections(this.model.id);
      }
    });
  }

  getCollections(id:number){
    this.collection_service.getAll()
      .subscribe(result => {
        for(let i = 0; i <  result.length; i++) {
            if(result[i].orderId == id)
            {
              result[i].collectionDate = new Date(result[i].collectionDate);
              this.collections.push(result[i]);
            }
          }
        return this.collections;
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
    
    var newModel = new OrderModel();
    newModel.customerId = this.model.customerId;
    newModel.dateCreated  = this.model.dateCreated;
    newModel.deposit  = this.model.deposit;
    newModel.id  = this.model.id;
    newModel.notes  = this.model.notes;
    newModel.orderBookId  = this.model.orderBookId;
    newModel.purchasePrice  = this.model.purchasePrice;
    newModel.salesPersonId  = this.model.salesPersonId;


    this.service.put(newModel)
      .subscribe(result => {
        this.updateCollections();
        this.toastr.success("Successfully updated order details", 'Success');
        
      }, err => {
        this.toastr.error('Could not process request', 'An error occurred');
        this.cancel();
      });
  }

  updateCollections(){
    this.collections.forEach(element => {

      var newCol = new CollectionModel();
      newCol.amount = element.amount;
      newCol.collectionDate =  element.collectionDate;
      newCol.id  =  element.id;
      newCol.notes =  element.notes;
      newCol.orderId  =  element.orderId;
      newCol.paid  =  element.paid;
      newCol.collectionDate.setHours(newCol.collectionDate.getHours() + 2);
      this.collection_service.put(newCol)
      .subscribe(result => {

        this.toastr.success("Successfully collection dates added", 'Success');
        this.router.navigate(['/orders']);
      }, err => {
        this.toastr.error('Could not process request', 'An error occurred');
        this.cancel();
      });
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

    getCustomer(id:number) {
        this.customer_service.get(id).subscribe(result => {
        this.selectedCustomer = result;
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

  filterCustomerMultiple(event:any) {
    let query = event.query;
    this.customer_service.getAll().subscribe(result => {
    this.customerResults = this.filterList(query, result);
    });
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
