import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../core';
import { CustomerModel} from '../models';

@Injectable()
export class CustomerService {
  controllerName = 'customers';

  constructor(private service: ApiService) { }

  getAll(): Observable<CustomerModel[]> {
    return this.service.getAll(this.controllerName)
  }
  
  get(id: number): Observable<CustomerModel> {
    return this.service.get(id, this.controllerName)
  }

  post(model: CustomerModel): Observable<CustomerModel> {
    return this.service.post(model, this.controllerName);
  }
  
  put(model: CustomerModel): Observable<CustomerModel> {
    var id = model.id
    delete model.id;
    return this.service.put(model, id , this.controllerName);
  }
}
