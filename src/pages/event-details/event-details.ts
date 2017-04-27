import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseDataService } from '../../providers/firebase-service';

@Component({
  selector: 'event-details',
  templateUrl: 'event-details.html',
  providers: [FirebaseDataService]
})
export class EventDetailsPage {

    public event: any;

    constructor(
        private navCtrl: NavController,
        public navParams: NavParams,
        public FirebaseDataService: FirebaseDataService) {
        this.event = navParams.data;
    }

    goToEventLocation(location) {
        this.navCtrl.parent.viewCtrl.instance.event = location;
        let navId = this.navCtrl.parent.viewCtrl.instance.tabIds.NavigatePage;
        this.navCtrl.parent.select(navId);
    }

}
