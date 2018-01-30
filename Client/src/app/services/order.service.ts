import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../core';
import { OrderModel} from '../models';

@Injectable()
export class OrderService {
  controllerName = 'orders';

  constructor(private service: ApiService) { }

  getAll(): Observable<OrderModel[]> {
    return this.service.getAll(this.controllerName)
  }
  
  get(id: number): Observable<OrderModel> {
    return this.service.get(id, this.controllerName)
  }

  post(model: OrderModel): Observable<OrderModel> {
    return this.service.post(model, this.controllerName);
  }
  
  put(model: OrderModel): Observable<OrderModel> {
    var id = model.id
    delete model.id;
    return this.service.put(model, id , this.controllerName);
  }
}