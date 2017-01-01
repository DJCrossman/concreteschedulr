import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'contact-details',
  templateUrl: 'contact-details.html'
})
export class ContactDetailsPage {

    public contact: any;

    constructor(private navCtrl: NavController, public navParams: NavParams) {
        this.contact = navParams.data;
    }

}
