import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { NavigatePage } from '../navigate/navigate';
import { ContactPage } from '../contact/contact';

enum TabIds {
    HomePage = 0,
    NavigatePage = 1,
    ContactPage = 2
};

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public tabIds: any = {
      HomePage: 0,
      NavigatePage: 1,
      ContactPage: 2
  };
  _data: any;
  tab1Root: any = HomePage;
  tab2Root: any = NavigatePage;
  tab3Root: any = ContactPage;

  constructor() {

  }

  get data() {
      return this._data;
  }

  setData(data) {
      return new Promise(resolve => {
          this._data = data;
          resolve();
      });
  }
}
