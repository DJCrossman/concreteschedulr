import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ContactDetailsPage } from '../contact-details/contact-details';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

    public contacts: Array<Object>;

    constructor(public navCtrl: NavController) {
        this.loadContacts();
    }

    loadContacts() {
        this.navCtrl.parent.viewCtrl.instance.ready().then(() => {
            let data = this.navCtrl.parent.viewCtrl.instance.data;
            this.contacts = data.contacts;
        });
    }

    goToContactDetail(contact) {
        this.navCtrl.push(ContactDetailsPage, contact);
    }

}
