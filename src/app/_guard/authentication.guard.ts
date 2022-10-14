import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { NotificationService } from '../_services/notification.service';
import { NotificationType } from '../_utilities/notification-type-enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService : AuthenticationService, private router : Router,
    private notificationService: NotificationService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    return this.isUserLoggedIn();
  }
  
  private isUserLoggedIn():boolean {
      if (this.authenticationService.isLoggedIn()) {
        return true;
      }
      this.router.navigate(['/login']);
      this.notificationService.notify(NotificationType.ERROR, `vous devez vous connectez pour avoir accés au système`.toUpperCase());
      return false;
  }
}
