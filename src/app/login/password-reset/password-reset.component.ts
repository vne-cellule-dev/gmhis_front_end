import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { UserService } from 'src/app/_services/user.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CustomvalidationService } from 'src/app/_services/customvalidation.service';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit ,  OnDestroy{ private subs = new SubSink();

  faEye = faEye;
  EyeIcon = faEyeSlash;

  showPassword = true;

  /**
    * the form valid state
    */
  public invalidFom = false;

  /**
   * check if the form is submitted
   */
  public formSubmitted = false;

  /* 
     form
  */
  resetPasswordForm: FormGroup;
  user: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private notificationService: NotificationService,
    private customValidator: CustomvalidationService,
    private fb: FormBuilder,
  ) { }

   // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    if (!this.userService.getUserFromLocalCache().passwordMustBeChange) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/reset-password');
    }
    this.initForm();
  }

  /*
  init form 
  */
  initForm() {
    this.authenticationService.getUserFromLocalStorage();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.resetPasswordForm = this.fb.group({
      currentUsername: new FormControl(this.user.username),
      newPassword: new FormControl('', Validators.compose([Validators.required, this.customValidator.patternValidator()])),
      confirmPassword: new FormControl('', [Validators.required])
    },
      {
        validator: this.customValidator.MatchPassword('newPassword', 'confirmPassword'),
      }
    );
  }
  get registerFormControl() {
    return this.resetPasswordForm.controls;
  }
  onPasswordReset() {
    this.invalidFom = !this.resetPasswordForm.valid;

    this.formSubmitted = true;

    if (this.resetPasswordForm.valid) {

      let data = this.resetPasswordForm.value;

      this.userService.resetPassword(data).subscribe(
        (response: HttpResponse<User>) => {
          this.authenticationService.addUserToLocalStorage(response.body);
          this.notificationService.notify(NotificationType.SUCCESS, "Nom d'utilisateur et mot de passe reinitialiser avec succès");
          this.authenticationService.logOut();
          this.router.navigateByUrl('/login');
          // this.showloading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    }

  }

  /*start show and hide password function */

  getInputType() {
    if (this.showPassword) {
      this.EyeIcon = faEye;
      return 'password';

    }
    this.EyeIcon = faEyeSlash;
    return 'text';
  }

  getIconType() {
    if (this.showPassword) {
      return 'faEyeSlash';
    }
    return 'faEye';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;

  }

  /*End show and hide password function */

  logOut() {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login')
  }

}
