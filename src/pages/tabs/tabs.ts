import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../home/home';
import { NavigatePage } from '../navigate/navigate';
import { ContactPage } from '../contact/contact';
import { FirebaseDataService } from '../../providers/firebase-service';

enum TabIds {
    HomePage = 0,
    NavigatePage = 1,
    ContactPage = 2
};

@Component({
  templateUrl: 'tabs.html',
  providers: [FirebaseDataService]
})
export class TabsPage {
  public tabIds: any = {
      HomePage: 0,
      NavigatePage: 1,
      ContactPage: 2
  };
  _event: any;
  _promise: Promise<any>;
  tab1Root: any = HomePage;
  tab2Root: any = NavigatePage;
  tab3Root: any = ContactPage;

  constructor(platform: Platform, public service: FirebaseDataService) {
    this._promise = this.service.load().then(data => {
      platform.ready().then(() => {
          StatusBar.styleDefault();
          Splashscreen.hide();
      });
    });
  }

  ready() {
    return this._promise;
  }
  
  get event(): any {
      return this._event;
  }

  set event(event: any) {
      this._event = event;
  }
}
