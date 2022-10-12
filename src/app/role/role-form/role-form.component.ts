import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/_models/role.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { RoleService } from 'src/app/_services/role.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit, OnDestroy {
    private subs = new SubSink();

  /* 
    role model
  */
  @Input()
  public role: Role;

  @Output("addRole") addRole: EventEmitter<any> = new EventEmitter();
  @Output("updateRole") updateRole: EventEmitter<any> = new EventEmitter();

  /**
   * search form
   */
  public form: FormGroup;

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
    private roleService: RoleService,
    private notificationService: NotificationService
  ) { }

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.initform();
    if (this.role) {
      this.roleService.getRoleDetails(this.role.id).subscribe(
        (response : Role)=>{
          this.form.patchValue(response);
        }
      )
    }
  }

  /**
   * 
   */
  initform() {
    this.form = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("", [Validators.required]),
      active: new FormControl(true, [Validators.required]),
    })
  }


  get name() { return this.form.get('name'); }

  get active() { return this.form.get('active'); }

  /**
   * save or update the item
   */
  save() {

    this.invalidFom = !this.form.valid;

    this.formSubmitted = true;

    if (this.form.valid) {
      this.showloading = true;
      this.role = this.form.value;

      if (this.role.id) {
        this.subs.add(
          this.roleService.update(this.role).subscribe(
            (response: Role) => {
              this.showloading = false;
              this.updateRole.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showloading = false;
              this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
            }
          ));
      } else {

        this.subs.add(
          this.roleService.save(this.role).subscribe(
            (response: Role) => {
              this.showloading = false;
              this.addRole.emit();
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
