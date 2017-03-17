import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, public push: Push) {
    platform.ready().then(() => {
        push.register().then((t: PushToken) => {
            return push.saveToken(t);
        }).then((t: PushToken) => {
            console.log('Token saved:', t.token);
        });
    });
  }
}
