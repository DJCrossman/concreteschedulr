import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConferenceService } from '../../providers/conference-service';

@Component({
  selector: 'event-details',
  templateUrl: 'event-details.html',
  providers: [ConferenceService]
})
export class EventDetailsPage {

    public event: any;

    constructor(
        private navCtrl: NavController,
        public navParams: NavParams,
        public conferenceService: ConferenceService) {
        this.event = navParams.data;
    }

    goToEventLocation(location) {
        this.navCtrl.parent.viewCtrl.instance.setData(location).then(() => {
            let navId = this.navCtrl.parent.viewCtrl.instance.tabIds.NavigatePage;
            this.navCtrl.parent.select(navId);
        });
    }

}
