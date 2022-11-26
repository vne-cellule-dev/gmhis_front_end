import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INameAndId } from 'src/app/shared/models/name-and-id';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IPharmacologicalForm } from '../pharmacological-form';
import { PharmacologicalFormService } from '../service/pharmacological-form.service';

@Component({
  selector: 'app-pharmacological-form',
  templateUrl: './pharmacological-form.component.html',
  styleUrls: ['./pharmacological-form.component.scss']
})
export class PharmacologicalFormComponent implements OnInit {

  private subs = new SubSink();

  @Input()
  pharmacologicalForm : IPharmacologicalForm;

  pharmacologicalFormDto : INameAndId;

  @Input()
  details: boolean;

  @Output('addPharmacologicalForm') addPharmacologicalForm: EventEmitter<any> = new EventEmitter();
  @Output('updatePharmacologicalForm') updatePharmacologicalForm: EventEmitter<any> =
    new EventEmitter();

  /**
   * form
   */
  public pharmacologicalFormForm: FormGroup;

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

  
  constructor(
    private pharmacologicalServie: PharmacologicalFormService,
    private notificationService: NotificationService
  ) {}

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
  
    this.initForm();
    if (this.pharmacologicalForm) {
      console.log(this.pharmacologicalForm);
      this.pharmacologicalFormForm.patchValue(this.pharmacologicalForm);
  
    }
  }

 

  initForm() {
    this.pharmacologicalFormForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      active: new FormControl(true),
      value: new FormControl(null),
    });
  }
  get name() {
    return this.pharmacologicalFormForm.get('name');
  }

  save() {
    this.invalidFom = !this.pharmacologicalFormForm.valid;
    this.formSubmitted = true;
    if (this.pharmacologicalFormForm.valid) {
      this.showloading = true;
      this.pharmacologicalFormDto = this.pharmacologicalFormForm.value;
      console.log(this.pharmacologicalFormDto);

      if (this.pharmacologicalFormDto.id) {
        this.subs.add(
          this.pharmacologicalServie.updatePharmacologicalForm(this.pharmacologicalFormDto).subscribe(
            (response: any) => {
              this.showloading = false;
              this.updatePharmacologicalForm.emit();
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
          this.pharmacologicalServie.createPharmacologicalForm(this.pharmacologicalFormDto).subscribe(
            (response: any) => {
              this.showloading = false;
              this.addPharmacologicalForm.emit();
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

}
