import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../core';
import { PersonModel} from '../models';

@Injectable()
export class PersonService {
  controllerName = 'Person';

  constructor(private service: ApiService) { }

  getAll(): Observable<PersonModel[]> {
    return this.service.getAll(this.controllerName)
  }
  
  get(id: number): Observable<PersonModel> {
    return this.service.get(id, this.controllerName)
  }


  post(model: PersonModel): Observable<PersonModel> {
    return this.service.post(model, this.controllerName);
  }
  
  put(model: PersonModel): Observable<PersonModel> {
    return this.service.put(model, this.controllerName);
  }
}
