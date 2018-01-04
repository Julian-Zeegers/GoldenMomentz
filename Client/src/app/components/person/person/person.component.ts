import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {AutoCompleteModule} from 'primeng/primeng';
import { ToastsManager  } from 'ng2-toastr/ng2-toastr';

import { 
  PersonModel, 
  } from '../../../models';

import { PersonService, 
   } from '../../../services';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  idParam: number;
  state: string = "New";
  updating: boolean = false;
  model = new PersonModel();

  selectedSkill: any;
  selectedOrganisation: any;

  constructor(private service: PersonService, 
              private router: Router, 
              private route: ActivatedRoute,
              
              private toastr: ToastsManager) { }

  ngOnInit() {

    this.route.paramMap
    .switchMap((params: ParamMap) => {
      this.idParam = +params.get('id');
      if (this.idParam > 0) {
        this.state = 'Update';
        this.updating = true;
      }
      else{
       
      }
      return this.service.get(this.idParam);
    }).subscribe((person: PersonModel) => {
      if (person != null) {
        this.model = person;
        
      }
    });
  }

  
  prepareModel() {
    let skillIds: number[] = [];
   
    
  }
  
  create(){
    this.prepareModel();

    this.service.post(this.model)
      .subscribe(result => {
        this.router.navigate(['/people']);
      }, err => {
        this.toastr.success("Successfully added new person", 'Success');
        this.toastr.error('Could not process request', 'An error occurred');
        this.cancel();
      });
  }

  update(){
    this.prepareModel();
    this.service.put(this.model)
      .subscribe(result => {
        this.toastr.success("Successfully updated person details", 'Success');
        this.router.navigate(['/people']);
      }, err => {
        this.toastr.error('Could not process request', 'An error occurred');
        this.cancel();
      });
  }

  cancel(){
       this.router.navigate(['/people']);
  }

    filterList(query:any, items: any[]):any[] {
        let filtered : any[] = [];
        for(let i = 0; i < items.length; i++) {
            let element = items[i];
            if(element.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(element);
            }
        }
        return filtered;
    }

    filterSkillMultiple(event:any) {
        
    }

    filterOrganisationMultiple(event:any) {
 
    }
}
