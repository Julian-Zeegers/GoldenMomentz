import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../core';
import { SalesPersonModel} from '../models';

@Injectable()
export class SalesPersonService {
  controllerName = 'salesPeople';

  constructor(private service: ApiService) { }

  getAll(): Observable<SalesPersonModel[]> {
    return this.service.getAll(this.controllerName)
  }
  
  get(id: number): Observable<SalesPersonModel> {
    return this.service.get(id, this.controllerName)
  }

  post(model: SalesPersonModel): Observable<SalesPersonModel> {
    return this.service.post(model, this.controllerName);
  }
  
  put(model: SalesPersonModel): Observable<SalesPersonModel> {
    var id = model.id
    delete model.id;
    return this.service.put(model, id , this.controllerName);
  }
}
