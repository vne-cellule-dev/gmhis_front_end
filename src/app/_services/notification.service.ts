import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../_utilities/notification-type-enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: NotifierService) { }

  public notify(type: NotificationType, message: string) {
    if (message) {
      this.notifier.notify(type, message)
    } else {
      this.notifier.notify(type, 'UNE ERREUR EST SURVENUE, VEUILLEZ RÉESSAYER')
    }
  }
}
