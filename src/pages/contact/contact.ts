import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ConferenceService } from '../../providers/conference-service';
import { ContactDetailsPage } from '../contact-details/contact-details';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [ConferenceService]
})
export class ContactPage {

    public contacts: Array<Object>;

    constructor(public navCtrl: NavController, public conferenceService: ConferenceService) {
        this.loadContacts();
    }

    loadContacts() {
        this.conferenceService.load().then(data => {
            this.contacts = data.contacts;
        });
    }

    goToContactDetail(contact) {
        this.navCtrl.push(ContactDetailsPage, contact);
    }

}
