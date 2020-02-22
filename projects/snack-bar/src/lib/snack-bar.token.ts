import { InjectionToken } from '@angular/core';

export const DEFAULT_MESSAGE: InjectionToken<string> = new InjectionToken('DEFAULT_SNACKBAR_MESSAGE', {
  providedIn: 'platform',
  factory: () => 'default snackbar message'
});
