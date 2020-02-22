import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from 'platform';
import { Observable, timer, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  notifications$: Observable<string> = this.notifications.notifications$.pipe(
    map(notification => (notification ? notification.toString() : null))
  );

  constructor(private notifications: NotificationService) {}

  ngOnInit(): void {
    this.populateNotifications();
  }
  clearNotifications(): void {
    this.notifications.clearNotifications();
  }

  populateNotifications(): void {
    timer(1000, 5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.notifications.newNotification());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
