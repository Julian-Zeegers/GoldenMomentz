import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {AutoCompleteModule} from 'primeng/primeng';
import { ToastsManager  } from 'ng2-toastr/ng2-toastr';

import { 
  CustomerModel, 
  } from '../../models';

import { CustomerService, 
   } from '../../services';


@Component({
  selector: 'app-person',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {
  idParam: number;
  state: string = "New";
  updating: boolean = false;
  model = new CustomerModel();



  constructor(private service: CustomerService, 
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
      
      return this.service.get(this.idParam);
    }).subscribe((person: CustomerModel) => {
      if (person != null) {
        this.model = person;
        // this.selectedGender = this.genders.find(x => x.id === person.genderId);
        // this.selectedRace = this.races.find(x => x.id === person.raceId);
        // this.selectedNationality = this.nationalities.find(x => x.id === person.nationalityId);
        // this.selectedExtension = this.extensions.find(x => x.id === person.extensionId);
        // this.getPersonSkills();
        // this.getPersonOrganisations();
      }
    });
  }

  
  prepareModel() {
    let skillIds: number[] = [];



    // this.model.skillIds = skillIds;
    // this.model.organisationIds = organisationIds;

    // this.model.genderId = this.selectedGender.id;
    // this.model.gender = null;

    // this.model.raceId = this.selectedRace.id;
    // this.model.race = null;

    // this.model.nationalityId = this.selectedNationality.id;
    // this.model.nationality = null;
    
    // this.model.extensionId = this.selectedExtension.id;
    // this.model.extension = null;
    
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
        let query = event.query;
        //this.skillService.getAll().subscribe(result => {
       // this.SkillResults = this.filterList(query, result);
    //  });
    }

    filterOrganisationMultiple(event:any) {
     //   let query = event.query;
    //    this.organisationService.getAll().subscribe(result => {
    //    this.OrgResults = this.filterList(query, result);
    //  });
        
    }
}
