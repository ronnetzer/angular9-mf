import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'platform'
})
export class NotificationService {
  private notifications: BehaviorSubject<number> = new BehaviorSubject(0);
  notifications$: Observable<number> = this.notifications.asObservable();

  constructor(private injector: Injector) {
    console.log('new instance of NotificationService:', injector);
  }

  getNotifications(): number {
    return this.notifications.value;
  }

  newNotification(): void {
    let notifications = this.notifications.value;
    this.notifications.next(++notifications);
  }

  clearNotifications(): void {
    this.notifications.next(0);
  }
}
