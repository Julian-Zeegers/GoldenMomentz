import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../core';
import { CollectionModel} from '../models';

@Injectable()
export class CollectionService {
  controllerName = 'collections';

  constructor(private service: ApiService) { }

  getAll(): Observable<CollectionModel[]> {
    return this.service.getAll(this.controllerName)
  }
  
  get(id: number): Observable<CollectionModel> {
    return this.service.get(id, this.controllerName)
  }

  post(modelArray: CollectionModel[]): Observable<CollectionModel> {
    return this.service.post(modelArray, this.controllerName);
  }
  
  put(model: CollectionModel): Observable<CollectionModel> {
    var id = model.id
    delete model.id;
    return this.service.put(model, id , this.controllerName);
  }
}