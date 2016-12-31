import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NavigatePage } from '../pages/navigate/navigate';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    NavigatePage,
    ContactPage,
    HomePage,
    EventDetailsPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NavigatePage,
    ContactPage,
    HomePage,
    EventDetailsPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
