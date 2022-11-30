import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { FaciityServiceService } from '../faciity-service.service';
import { IFacility } from '../models/facility';
import { IFacilityDto } from '../models/facility-dto';

@Component({
  selector: 'app-facility-form',
  templateUrl: './facility-form.component.html',
  styleUrls: ['./facility-form.component.scss']
})
export class FacilityFormComponent implements OnInit {
  private subs = new SubSink();

  @Input()
  facility: IFacility;

  facilityDto : IFacilityDto

  @Input()
  details: boolean;

  @Output('addFaciity') addFaciity: EventEmitter<any> = new EventEmitter();
  @Output('updateFacility') updateFacility: EventEmitter<any> =
    new EventEmitter();

  /**
   * form
   */
  public facilityForm: FormGroup;

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
    { id: true, value: 'Actif' },
    { id: false, value: 'En sommeil' },
  ];

  /**
   * handle the spinner
   */
  showloading: boolean = false;

  actives = [
    { id: true, value: 'Actif' },
    { id: false, value: 'Inactif' },
  ];

  private validatiomMessage: { [key: string]: { [key: string]: string } } = {
    hotelName: {
      required: "Le nom du centre de sante est obligatoire",
    }
  };



  public errorMessage!: string;


  private isFormSubmitted: boolean = false;
  facilityTypesNameAndId: any;
  facilityCategoriesNameAndId: any;
  image : any = "";
  facilityLogo : File;
  constructor(
    private facilityService: FaciityServiceService,
    private notificationService: NotificationService
  ) {}

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.findActiveFacilityTypeNameAndId();
    this.initForm();
    if (this.facility) {
      this.facilityService.getFacilityDetails(this.facility).subscribe(
        (res : any) => {
          console.log(res);       
          this.facilityForm.patchValue(res);
          this.facilityForm.get("facilityCategoryId").setValue(res["facilityCategoryId"]);
          if (res["facilityTypeId"]) {
            this.findActiveFacilityCategoriesNameAndId();
            this.facilityForm.get("facilityTypeId").setValue(res["facilityTypeId"]);
          }
        }
      )
    }
  }


  onSelectFile(event){
    this.facilityLogo = event.target.files[0];
    console.log(this.facilityLogo);
        
  }


  initForm() {
    this.facilityForm = new FormGroup({
      id: new FormControl(""),
      name: new FormControl('', [Validators.required]),
      active: new FormControl(true),
      dhisCode: new FormControl(""),
      facilityCategoryId: new FormControl(""),
      facilityTypeId: new FormControl(""),
      latitude: new FormControl(null),
      localCode: new FormControl("string"),
      localityId: new FormControl(1),
      longitude: new FormControl(null),
      shortName: new FormControl(null),
      address: new FormControl(null),
      contact: new FormControl(null),
      email: new FormControl(null),
    });
  }
  get name() {
    return this.facilityForm.get('name');
  }

  save() {
    this.invalidFom = !this.facilityForm.valid;
    this.formSubmitted = true;
    if (this.facilityForm.valid) {
      this.showloading = true;
      this.facilityDto = this.facilityForm.value;
      console.log(this.facilityDto);

      if (this.facilityDto.id) {
        this.subs.add(
          this.facilityService.updateFacility(this.facilityDto,this.facilityLogo).subscribe(
            (response: any) => {
              this.showloading = false;
              this.updateFacility.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showloading = false;
              this.notificationService.notify(
                NotificationType.ERROR,
                errorResponse.error.message
              );
            }
          )
        );
      } else {
        this.subs.add(
          this.facilityService.createFaciity(this.facilityDto, this.facilityLogo).subscribe(
            (response: IFacility) => {
              this.showloading = false;
              this.addFaciity.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showloading = false;
              this.notificationService.notify(
                NotificationType.ERROR,
                errorResponse.error.message
              );
            }
          )
        );
      }
    }
  }


  public findActiveFacilityTypeNameAndId(){
    this.facilityService.findActiveFacilityTypeNameAndId().subscribe(
      (response : any) => {
        this.facilityTypesNameAndId = response;        
      },
      (errorResponse : HttpErrorResponse) => {
        this.showloading = false;
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        ); 
      }
    )
  }
  
  onFacilityTypeNameAndIdChange(event){
    console.log(event);
    if (event == "7a8067ec-8ac1-484b-b827-98e8fa53ea2a") {
      this.findActiveFacilityCategoriesNameAndId();
    }else{
      this.facilityCategoriesNameAndId = [];
    }
  }

  public findActiveFacilityCategoriesNameAndId(){
    this.facilityService.findActiveFacilityCategoryNameAndId().subscribe(
      (response : any) => {
        this.facilityCategoriesNameAndId = response;
        console.log("facilityCategoriesNameAndId", this.facilityCategoriesNameAndId);  
      },
      (errorResponse : HttpErrorResponse) => {
        this.showloading = false;
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        ); 
      }
    )
  }
}
