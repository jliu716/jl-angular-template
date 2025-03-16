import { Routes } from '@angular/router';
import { OnpushTestComponent } from './routes/onpush-test/onpush-test.component';
import { DefaultTestComponent } from './routes/default-test/default-test.component';
import { HomeComponent } from './routes/home/home.component';

export const routes: Routes = [
   {
      path: '',
      component: HomeComponent
   },
   {
      path: 'onpush',
      title: 'OnPush',
      component: OnpushTestComponent
   },
   {
      path: 'default',
      title: 'Default',
      component: DefaultTestComponent
   }
];
