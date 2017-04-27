import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ContactDetailsPage } from '../contact-details/contact-details';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

    public contacts: any[];
    public socialMedia: any = {};

    constructor(public navCtrl: NavController) {
        this.loadContacts();
    }

    loadContacts() {
        this.navCtrl.parent.viewCtrl.instance.ready().then(() => {
            let service = this.navCtrl.parent.viewCtrl.instance.service;
            this.socialMedia = service.settings.socialMedia;
            this.contacts = service.contacts;
        });
    }

    goToContactDetail(contact) {
        this.navCtrl.push(ContactDetailsPage, contact);
    }

}
