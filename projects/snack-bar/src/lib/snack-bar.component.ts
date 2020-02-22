import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  OnDestroy,
  Inject,
  NgModule
} from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from 'platform';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentType } from '@angular/cdk/portal';
import { DEFAULT_MESSAGE } from './snack-bar.token';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'snack-bar',
  template: ``,
  providers: [Overlay, MatSnackBar],
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit, OnDestroy {
  private snackBarRef: MatSnackBarRef<any> | null;
  private destroy$: Subject<void> = new Subject();
  @Input() data: any | null;
  @Input() duration: number | null;
  @Input() action: string | null;
  @Input() message: string | null;
  @Input() component: ComponentType<any> | null;
  @Input() template: TemplateRef<any> | null;

  constructor(
    private snackBar: MatSnackBar,
    private notifications: NotificationService,
    @Inject(DEFAULT_MESSAGE) private defaultMessage: string
  ) { }

  ngOnInit(): void {
    this.listenForNotifications();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private listenForNotifications(): void {
    this.notifications.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe(notifications => !!notifications && this.showSnackBar());
  }

  showSnackBar(): void {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
    if (this.component) {
      this.snackBarRef = this.snackBar.openFromComponent(this.component, {
        data: this.data,
        duration: this.duration,
        announcementMessage: this.message || this.defaultMessage
      });
    } else if (this.template) {
      this.snackBarRef = this.snackBar.openFromTemplate(this.template, {
        data: this.data,
        duration: this.duration,
        announcementMessage: this.message || this.defaultMessage
      });
    } else {
      this.snackBarRef = this.snackBar.open(this.message || this.defaultMessage, this.action, {
        duration: this.duration,
        announcementMessage: this.message || this.defaultMessage
      });
    }
  }
}
