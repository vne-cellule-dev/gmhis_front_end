import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit,  OnDestroy ,Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Depot } from 'src/app/_models/depot.model';
import { Role } from 'src/app/_models/role.model';
import { User } from 'src/app/_models/user.model';
import { DepotService } from 'src/app/_services/depot.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { RoleService } from 'src/app/_services/role.service';
import { UserService } from 'src/app/_services/user.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit ,  OnDestroy{ private subs = new SubSink();

  @Input()
  user: User;

  @Output("addUser") addUser: EventEmitter<any> = new EventEmitter();
  @Output("updateUser") updateUser: EventEmitter<any> = new EventEmitter();
  /* 
    login form
  */
  public userForm: FormGroup;

  /**
* the form valid state
*/
  public invalidFom = false;

  /**
   * check if the form is submitted
   */
  public formSubmitted = false;

  invalidFormControls: any;

  depots: Depot[];

  roles: Role[];


  fileName: string;

  profileImage: File;

  files: File[] = [];

  /**
   * define isActive options
   */
  states = [
    { id: true, value: "Actif" },
    { id: false, value: "En sommeil" },

  ];

  controllerAllDepotOptions = [
    { id: true, value: "Oui" },
    { id: false, value: "Non" },

  ];
  
  
  /**
  * define isActive options
  */
  lockOptions = [
    { id: false, value: "Verrouillé" },
    { id: true, value: "Non verouillé" },

  ];

  /**
  * define isActive options
  */
  changPwdOptions = [
    { id: true, value: "Oui" },
    { id: false, value: "Non" },

  ];

  /**
   * handle the spinner
   */
  showloading: boolean = false;

  

  constructor(private router: Router,
    private userService: UserService,
    private depotService: DepotService,
    private roleService: RoleService,
    private notificationService: NotificationService) { }


  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    let userRoles = [];
    if (this.user) {

 
      if (this.user.roleIds) {
        userRoles = this.user.roleIds.split(",").map(function (item) {
          if (item.trim) return parseInt(item, 10);
        });
      }
      
      this.subs.add(
        this.userService.getUserDetail(this.user.id).subscribe(
          (response : User)=>{
            console.log(response);
            
           this.userForm.patchValue(response)
           this.userForm.get("notLocked").setValue(response["notLocked"]);
           this.userForm.get("active").enable();
           this.userForm.get("notLocked").enable();
           this.userForm.get("passwordMustBeChange").enable()
           this.userForm.get("roles").setValue(userRoles);
          }
        )
      )
     ;
    }

    this.getRoleActifList();

  }

  initForm() {
    this.userForm = new FormGroup({
      id: new FormControl(0),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      tel: new FormControl('', [Validators.required]),
      roles: new FormControl('', [Validators.required]),
      facilityId : new FormControl('2bd56b2f-80ed-4a8c-a496-cd7f8b676f42'),
      active: new FormControl({ value: true, disabled: true }, [Validators.required]),
      notLocked: new FormControl({ value: false, disabled: true }, [Validators.required]),
      passwordMustBeChange: new FormControl({ value: true, disabled: true }, [Validators.required]),
    });
  }

  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get tel() { return this.userForm.get('tel'); }
  get active() { return this.userForm.get('active'); }
  get controllerAllDepot() { return this.userForm.get('controllerAllDepot'); }
  get isNonLocked() { return this.userForm.get('isNonLocked'); }
  get passwordMustBeChange() { return this.userForm.get('passwordMustBeChange'); }
  get role() { return this.userForm.get('roles'); }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.profileImage = this.files[0];
    this.readFile(this.files[0]).then(fileContents => {
    })
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  save() {

    this.invalidFom = !this.userForm.valid;
    this.formSubmitted = true;
    if (this.userForm.valid) {
      this.showloading = true;
      this.user = this.userForm.getRawValue();

      if (this.user.id) {
        console.log(this.user);
        this.subs.add(
          this.userService.updateUser(this.user).subscribe(
          (response: User) => {
            this.showloading = false;
            this.updateUser.emit();
          },
          (errorResponse: HttpErrorResponse) => {
            this.showloading = false;
            this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
          }
        ));
      } else {
        this.subs.add(
          this.userService.addUser(this.user).subscribe(
          (response: User) => {
            this.showloading = false;
            this.addUser.emit();
          },
          (errorResponse: HttpErrorResponse) => {
            this.showloading = false;
            this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
          }
        ));
      }

    }
  }

  public onProfileImageChange(fileName: string, profileImage: File): void {
    this.fileName = fileName;
    this.profileImage = profileImage;
  }


  private getRoleActifList() {
    this.roleService.findAllActive().subscribe(
      (response: Role[]) => {
        this.roles = response;
      }
    )
  }

}
