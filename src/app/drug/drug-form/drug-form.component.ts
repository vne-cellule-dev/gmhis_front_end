import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { DciService } from '../dci/service/dci.service';
import { IDrug } from '../models/drug';
import { IDrugDto } from '../models/drug-dto';
import { PharmacologicalFormService } from '../pharmacologicalForm/service/pharmacological-form.service';
import { DrugService } from '../services/drug.service';
import { TherapeuticService } from '../therapeuticClass/service/therapeutic.service';

@Component({
  selector: 'app-drug-form',
  templateUrl: './drug-form.component.html',
  styleUrls: ['./drug-form.component.scss']
})
export class DrugFormComponent implements OnInit {

  private subs = new SubSink();

  @Input()
  drug : IDrug;

  drugDto : IDrugDto;

  @Input()
  details: boolean;

  @Output('addDrug') addDrug: EventEmitter<any> = new EventEmitter();
  @Output('updateDrug') updateDrug: EventEmitter<any> =
    new EventEmitter();

  /**
   * form
   */
  public drugForm: FormGroup;

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

 

  

  public errorMessage!: string;

  public formsErrors: { [key: string]: string } = {};

  private isFormSubmitted: boolean = false;
  dcisNameAndId: any;
  therapeuticsNameAndId: any;
  pharmacologicalFormsNameAndId: any;

  
  constructor(
    private drugService: DrugService,
    private notificationService: NotificationService,
    private dciService : DciService,
    private therapeuticService : TherapeuticService,
    private pharmacologicalForm : PharmacologicalFormService
  ) {}

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    if (this.drug) {
      this.drugService.getActDrugDetails(this.drug).subscribe(
        (response : any) => {
          console.log(response);
          this.drugForm.patchValue(response);
        }
      )  
    }
    this.findActiveActDciNameAndId();
    this.findActivePharmacologicalFormNameAndId();
    this.findActiveTherapeuticClassNameAndId();
  }

 

  initForm() {
    this.drugForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      active: new FormControl(null),
      dosage: new FormControl(''),
      drugDciId: new FormControl(''),
      drugPharmacologicalId: new FormControl(''),
      drugPrice: new FormControl(''),
      drugtherapicalId: new FormControl(''),
    });
  }
  get name() {
    return this.drugForm.get('name');
  }

  save() {
    this.invalidFom = !this.drugForm.valid;
    this.formSubmitted = true;
    if (this.drugForm.valid) {
      this.showloading = true;
      this.drugDto = this.drugForm.value;
      console.log(this.drugDto);
      
      if (this.drugDto.id) {
        this.subs.add(
          this.drugService.updateDrug(this.drugDto).subscribe(
            (response: any) => {
              this.showloading = false;
              this.updateDrug.emit();
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
          this.drugService.createDrug(this.drugService).subscribe(
            (response: any) => {
              this.showloading = false;
              this.addDrug.emit();
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


  private findActiveActDciNameAndId(){
    this.dciService.findActiveDciNameAndId().subscribe(
      (response : any) => {
        this.dcisNameAndId = response;
        
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

  private findActiveTherapeuticClassNameAndId(){
    this.therapeuticService.findActiveTherapeuticClassNameAndId().subscribe(
      (response : any) => {
        this.therapeuticsNameAndId = response;
        
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

  private findActivePharmacologicalFormNameAndId(){
    this.pharmacologicalForm.findActivePharmacologicalNameAndId().subscribe(
      (response : any) => {
        this.pharmacologicalFormsNameAndId = response;
        console.log(this.pharmacologicalFormsNameAndId);
        
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
