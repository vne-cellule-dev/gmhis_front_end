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
           this.userForm.patchValue(response)
           this.userForm.get("depot").setValue(response.depot["id"]);
           this.userForm.get("isNonLocked").setValue(response["notLocked"]);
           this.userForm.get("isActive").enable();
           this.userForm.get("isNonLocked").enable();
           this.userForm.get("passwordMustBeChange").enable()
           this.userForm.get("role").setValue(userRoles);
          }
        )
      )
     ;
    }

    this.getDepotActifList();
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
      depot: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      isActive: new FormControl({ value: true, disabled: true }, [Validators.required]),
      controllerAllDepot: new FormControl(false, [Validators.required]),
      isNonLocked: new FormControl({ value: false, disabled: true }, [Validators.required]),
      passwordMustBeChange: new FormControl({ value: true, disabled: true }, [Validators.required]),
      profilImage: new FormControl(''),
    });
  }

  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get tel() { return this.userForm.get('tel'); }
  get depot() { return this.userForm.get('depot'); }
  get isActive() { return this.userForm.get('isActive'); }
  get controllerAllDepot() { return this.userForm.get('controllerAllDepot'); }
  get isNonLocked() { return this.userForm.get('isNonLocked'); }
  get passwordMustBeChange() { return this.userForm.get('passwordMustBeChange'); }
  get userImage() { return this.userForm.get('profilImage'); }
  get role() { return this.userForm.get('role'); }

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
        this.subs.add(
          this.userService.updateUser(this.userService.createUserFormdData(this.user.username, this.user, this.profileImage)).subscribe(
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
          this.userService.addUser(this.userService.createUserFormdData(null, this.user, this.profileImage)).subscribe(
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
  private getDepotActifList() {
    this.depotService.findActive().subscribe(
      (response: Depot[]) => {
        this.depots = response;
      }
    )
  }

  private getRoleActifList() {
    this.roleService.findAllActive().subscribe(
      (response: Role[]) => {
        this.roles = response;
      }
    )
  }

}
