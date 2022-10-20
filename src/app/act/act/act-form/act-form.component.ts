import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { ActCategoryService } from '../../category/service/act-category.service';
import { CodeService } from '../../code/code.service';
import { ActGroupService } from '../../family/act-group.service';
import { Act } from '../models/act';
import { ActDto } from '../models/act-dto';
import { ActService } from '../service/act.service';

@Component({
  selector: 'app-act-form',
  templateUrl: './act-form.component.html',
  styleUrls: ['./act-form.component.scss']
})
export class ActFormComponent implements OnInit {

  private subs = new SubSink();

  @Input()
  act: Act;

  actDto : ActDto;


  @Input()
  details: boolean;

  @Output('addAct') addAct: EventEmitter<any> = new EventEmitter();
  @Output('updateAct') updateAct: EventEmitter<any> =
    new EventEmitter();

  /**
   * form
   */
  public actForm: FormGroup;

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
  actCategoriesNameAndId: any;
  actCodeodesNameAndId: any;
  actGroupsNameAndId: any;

  constructor(
    private actService: ActService,
    private notificationService: NotificationService,
    private actCodeService : CodeService,
    private actCategoryService : ActCategoryService,
    private actGroupService : ActGroupService
  ) {}

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
   
    this.initForm();
    if (this.act) {
      this.actForm.patchValue(this.act);
    }
    this.findActiveActCategoryNameAndId();
    this.findActiveActCodeNameAndId();
    this.findActiveActGroupNameAndId();
  }



 
  initForm() {
    this.actForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      active: new FormControl(true),
      actCategory: new FormControl(null),
      actCode: new FormControl(null),
      actGroup: new FormControl(null),
      codification: new FormControl(null),
      coefficient: new FormControl(null),
      description: new FormControl(null),
    });
  }
  get name() {
    return this.actForm.get('name');
  }

  save() {
    this.invalidFom = !this.actForm.valid;
    this.formSubmitted = true;
    if (this.actForm.valid) {
      this.showloading = true;
      this.actDto = this.actForm.value;
      console.log(this.actDto);

      if (this.actDto.id) {
        this.subs.add(
          this.actService.updateAct(this.actDto).subscribe(
            (response: ActDto) => {
              this.showloading = false;
              this.updateAct.emit();
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
          this.actService.createAct(this.actDto).subscribe(
            (response: ActDto) => {
              this.showloading = false;
              this.addAct.emit();
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

  private findActiveActCategoryNameAndId(){
    this.actCategoryService.findActiveActCategoryNameAndId().subscribe(
      (response : any) => {
        this.actCategoriesNameAndId = response;
        console.log("actCategoriesNameAndId",this.actCategoriesNameAndId);
        
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

  private findActiveActCodeNameAndId(){
    this.actCodeService.findActiveActCodeNameAndId().subscribe(
      (response : any) => {
        this.actCodeodesNameAndId = response;
        console.log("actCodeodesNameAndId", this.actCodeodesNameAndId);
        
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

  private findActiveActGroupNameAndId(){
    this.actGroupService.findActiveActGroupNameAndId().subscribe(
      (response : any) => {
        this.actGroupsNameAndId = response;
        console.log("actGroupsNameAndId", this.actGroupsNameAndId);
        
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
