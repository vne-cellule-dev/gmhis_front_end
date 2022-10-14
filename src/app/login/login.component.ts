import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../_models/user.model';
import { AuthenticationService } from '../_services/authentication.service';
import { NotificationService } from '../_services/notification.service';
import { HeaderType } from '../_utilities/header-type-enum';
import { NotificationType } from '../_utilities/notification-type-enum';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';

import { SubSink } from 'subsink';
import { ArticleService } from '../_services/article.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  faEye = faEye;

  EyeIcon = faEyeSlash;
  LockIcon = faLock;
  /* 
    login form
  */
  loginForm: FormGroup;

  showPassword = true;

  /* 
   handle the spinner
 */
  showloading: boolean;
  articles: any[];

  readOnly = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private articleService: ArticleService
  ) {}

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('login');
    }
    this.initForm();
  }

  /*
  init form 
  */

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public onLogin(user: User): void {
    this.showloading = true;
    this.subs.add(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalStorage(response.body);
          this.router.navigateByUrl('/home');
          localStorage.setItem('menuItem', 'profil');
          this.showloading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.notify(
            NotificationType.ERROR,
            errorResponse.error.message
          );
          this.showloading = false;
        }
      )
    );
  }

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

  onClick() {
    this.loginForm.get('username').enable();
  }

  onfocusout() {
    this.loginForm.get('username').disable();
    // this.readOnly = true;
  }
}
