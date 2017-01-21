import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../home/home';
import { NavigatePage } from '../navigate/navigate';
import { ContactPage } from '../contact/contact';
import { ConferenceService } from '../../providers/conference-service';

enum TabIds {
    HomePage = 0,
    NavigatePage = 1,
    ContactPage = 2
};

@Component({
  templateUrl: 'tabs.html',
  providers: [ConferenceService]
})
export class TabsPage {
  public tabIds: any = {
      HomePage: 0,
      NavigatePage: 1,
      ContactPage: 2
  };
  _data: any;
  _event: any;
  _promise: Promise<any>;
  tab1Root: any = HomePage;
  tab2Root: any = NavigatePage;
  tab3Root: any = ContactPage;

  constructor(platform: Platform, public conferenceService: ConferenceService) {
    this._promise = this.conferenceService.load().then(data => {
      this.data = data;
      platform.ready().then(() => {
          StatusBar.styleDefault();
          Splashscreen.hide();
      });
    });
  }

  ready() {
    return this._promise;
  }

  get data(): any {
      return this._data;
  }

  set data(data: any) {
      this._data = data;
  }

  get event(): any {
      return this._event;
  }

  set event(event: any) {
      this._event = event;
  }
}
