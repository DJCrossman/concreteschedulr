import { NgModule, ErrorHandler } from '@angular/core';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NavigatePage } from '../pages/navigate/navigate';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { ContactDetailsPage } from '../pages/contact-details/contact-details';
import { TabsPage } from '../pages/tabs/tabs';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'ba7b6e83'
  },
  'push': {
    'sender_id': '236240123015',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'forceShow': true
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    NavigatePage,
    ContactPage,
    ContactDetailsPage,
    HomePage,
    EventDetailsPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NavigatePage,
    ContactPage,
    ContactDetailsPage,
    HomePage,
    EventDetailsPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
