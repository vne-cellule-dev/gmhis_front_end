import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INameAndId } from 'src/app/shared/models/name-and-id';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { TherapeuticService } from '../service/therapeutic.service';
import { ITherapeuticClass } from '../therapeutic-class';

@Component({
  selector: 'app-therapeutic-form',
  templateUrl: './therapeutic-form.component.html',
  styleUrls: ['./therapeutic-form.component.scss']
})
export class TherapeuticFormComponent implements OnInit {

  private subs = new SubSink();

  @Input()
  therapeuticClass : ITherapeuticClass;

  therapeuticDto : INameAndId;

  @Input()
  details: boolean;

  @Output('addTherapeutic') addTherapeutic: EventEmitter<any> = new EventEmitter();
  @Output('updateTherapeutic') updateTherapeutic: EventEmitter<any> =
    new EventEmitter();

  /**
   * form
   */
  public therapeuticForm: FormGroup;

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
    private therapeuticService: TherapeuticService,
    private notificationService: NotificationService
  ) {}

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
  
    this.initForm();
    if (this.therapeuticClass) {
      this.therapeuticForm.patchValue(this.therapeuticClass);
  
    }
  }

 

  initForm() {
    this.therapeuticForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      active: new FormControl(true),
      value: new FormControl(null),
    });
  }
  get name() {
    return this.therapeuticForm.get('name');
  }

  save() {
    this.invalidFom = !this.therapeuticForm.valid;
    this.formSubmitted = true;
    if (this.therapeuticForm.valid) {
      this.showloading = true;
      this.therapeuticDto = this.therapeuticForm.value;

      if (this.therapeuticDto.id) {
        this.subs.add(
          this.therapeuticService.updateTherapeuticClass(this.therapeuticDto).subscribe(
            (response: ITherapeuticClass) => {
              this.showloading = false;
              this.updateTherapeutic.emit();
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
          this.therapeuticService.createTherapeuticClass(this.therapeuticDto).subscribe(
            (response: any) => {
              this.showloading = false;
              this.addTherapeutic.emit();
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
