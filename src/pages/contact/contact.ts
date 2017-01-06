import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { ConferenceService } from '../../providers/conference-service';
import { ContactDetailsPage } from '../contact-details/contact-details';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [ConferenceService]
})
export class ContactPage {

    public contacts: Array<Object>;

    constructor(
        public navCtrl: NavController,
        public conferenceService: ConferenceService,
        public loadingCtrl: LoadingController) {
        this.loadContacts();
    }

    loadContacts() {
        let loading = this.loadingCtrl.create({ spinner: 'circles' });
        loading.present();
        this.conferenceService.load().then(data => {
            loading.dismiss();
            this.contacts = data.contacts;
        });
    }

    goToContactDetail(contact) {
        this.navCtrl.push(ContactDetailsPage, contact);
    }

}
