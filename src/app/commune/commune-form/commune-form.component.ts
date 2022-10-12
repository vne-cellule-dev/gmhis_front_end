import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { City } from 'src/app/_models/city.model';
import { Commune } from 'src/app/_models/commune.model';
import { CityService } from 'src/app/_services/city.service';
import { CommuneService } from 'src/app/_services/commune.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-commune-form',
  templateUrl: './commune-form.component.html',
  styleUrls: ['./commune-form.component.scss']
})
export class CommuneFormComponent implements OnInit {

  private subs = new SubSink();

  @Input()
  commune: Commune;

  @Input()
  details: boolean;

  @Output("addCommune") addCommune: EventEmitter<any> = new EventEmitter();
  @Output("updateCommune") updateCommune: EventEmitter<any> = new EventEmitter();

  /**
   * form
   */
  public communeForm: FormGroup;

  /**
  * the form valid state
  */
  public invalidFom = false;
  
  /**
   * check if the form is submitted
   */
  public formSubmitted = false;

  /**
   * define isActive options
   */
  states = [
    { id: true, value: "Actif" },
    { id: false, value: "En sommeil" },
  ];

  /**
   * handle the spinner
   */
  showloading: boolean = false;
  cities: City[];

  

  constructor(
    private communeService : CommuneService,
    private notificationService: NotificationService,
    private cityServie : CityService) { }

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    if (this.commune){            
      this.subs.add(
        this.communeService.getCommuneDetails(this.commune).subscribe(
          (response : Commune)=>{       
            this.communeForm.patchValue(response);
            if (this.details) {              
              this.communeForm.disable();
            }
          }
        )
      )
    }
  }

  initForm() {
    this.communeForm = new FormGroup({
      id: new FormControl(0),
      informations: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      numberOfSites: new FormControl(0)
    });
  }
  get name() { return this.communeForm.get('name'); }


  save() {
    this.invalidFom = !this.communeForm.valid;
    this.formSubmitted = true;
    if (this.communeForm.valid) {
      this.showloading = true;
      this.commune = this.communeForm.value;   
      if (this.commune.id) {
        this.subs.add(
          this.communeService.updateCommune(this.commune).subscribe(
            (response: Commune) => {
              this.showloading = false;
              this.updateCommune.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showloading = false;
              this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
            }
          ));
      } else {
        this.subs.add(
          this.communeService.saveCommune(this.commune).subscribe(
            (response: Commune) => {
              this.showloading = false;
              this.addCommune.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showloading = false;
              this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
            }
          ));
      }
    }
  }

}
