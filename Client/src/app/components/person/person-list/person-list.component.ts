import { Component, OnInit } from '@angular/core';
import { PersonService, } from '../../../services';
import { PersonModel, } from '../../../models';
import { Router } from '@angular/router';
import { DataTableModule, SharedModule, TabViewModule } from 'primeng/primeng';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: []
})
export class PersonListComponent implements OnInit {
  addPerson = new PersonModel();
  updatePerson = new PersonModel();
  persons: PersonModel[] = [];
  
  testVal:any;
  
  constructor(private service: PersonService, 
              private router: Router,
              ) { }

  ngOnInit() {
    this.getAll();
    
  }

  getAll(){
    this.service.getAll()
      .subscribe(result => {
        return this.persons = result
      });
  }

  
  get(id: number){
    this.service.get(id)
    .subscribe(result => {
      return this.updatePerson = result
    });
  }
  update(person: PersonModel): void {
    this.updatePerson = person;
    this.router.navigate(['/personUpdate', person.id]);
  }


}
