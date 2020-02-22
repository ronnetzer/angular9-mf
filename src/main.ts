import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerElement } from 'utils/register-element';
import { SnackBarComponent } from 'snackbar';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  registerElement('snack-bar', SnackBarComponent, ref.injector);
})
.catch(err => console.error(err));
