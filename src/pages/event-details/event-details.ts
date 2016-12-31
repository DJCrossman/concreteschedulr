import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavigatePage } from '../navigate/navigate';

@Component({
  selector: 'event-details',
  templateUrl: 'event-details.html'
})
export class EventDetailsPage {

    public event: any;

    constructor(private navCtrl: NavController, public navParams: NavParams) {
        this.event = navParams.data;
    }

    goToEventLocation(location) {
        this.navCtrl.push(NavigatePage, location);
    }

}
