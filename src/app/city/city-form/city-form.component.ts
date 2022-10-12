import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { City } from 'src/app/_models/city.model';
import { CityService } from 'src/app/_services/city.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})
export class CityFormComponent implements OnInit {

  private subs = new SubSink();

  @Input()
  city: City;

  @Input()
  details: boolean;

  @Output("addCity") addCity: EventEmitter<any> = new EventEmitter();
  @Output("updateCity") updateCity: EventEmitter<any> = new EventEmitter();

  /**
   * form
   */
  public cityForm: FormGroup;

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

  

  constructor(
    private cityService : CityService,
    private notificationService: NotificationService) { }

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    if (this.city){            
      this.subs.add(
        this.cityService.getCityDetails(this.city).subscribe(
          (response : City)=>{       
            this.cityForm.patchValue(response);
            if (this.details) {              
              this.cityForm.disable();
            }
          }
        )
      )
    }
  }

  initForm() {
    this.cityForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
    });
  }
  get name() { return this.cityForm.get('name'); }

  save() {
    this.invalidFom = !this.cityForm.valid;
    this.formSubmitted = true;
    if (this.cityForm.valid) {
      this.showloading = true;
      this.city = this.cityForm.value;      
      if (this.city.id) {
        this.subs.add(
          this.cityService.updateCity(this.city).subscribe(
            (response: City) => {
              this.showloading = false;
              this.updateCity.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showloading = false;
              this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
            }
          ));
      } else {
        this.subs.add(
          this.cityService.saveCity(this.city).subscribe(
            (response: City) => {
              this.showloading = false;
              this.addCity.emit();
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
