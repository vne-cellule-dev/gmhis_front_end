import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INameAndId } from 'src/app/shared/models/name-and-id';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IDci } from '../dci';
import { DciService } from '../service/dci.service';

@Component({
  selector: 'app-dci-form',
  templateUrl: './dci-form.component.html',
  styleUrls: ['./dci-form.component.scss']
})
export class DciFormComponent implements OnInit {

  private subs = new SubSink();

  @Input()
  dci : IDci;

  dciDto : INameAndId;

  @Input()
  details: boolean;

  @Output('addDci') addDci: EventEmitter<any> = new EventEmitter();
  @Output('updateDci') updateDci: EventEmitter<any> =
    new EventEmitter();

  /**
   * form
   */
  public dciForm: FormGroup;

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
    private dciService: DciService,
    private notificationService: NotificationService
  ) {}

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
  
    this.initForm();
    if (this.dci) {
      console.log(this.dci);
      this.dciForm.patchValue(this.dci);
  
    }
  }

 

  initForm() {
    this.dciForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      active: new FormControl(true),
      value: new FormControl(null),
    });
  }
  get name() {
    return this.dciForm.get('name');
  }

  save() {
    this.invalidFom = !this.dciForm.valid;
    this.formSubmitted = true;
    if (this.dciForm.valid) {
      this.showloading = true;
      this.dciDto = this.dciForm.value;
      console.log(this.dciDto);

      if (this.dciDto.id) {
        this.subs.add(
          this.dciService.updateDci(this.dciDto).subscribe(
            (response: any) => {
              this.showloading = false;
              this.updateDci.emit();
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
          this.dciService.createDci(this.dciDto).subscribe(
            (response: any) => {
              this.showloading = false;
              this.addDci.emit();
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
