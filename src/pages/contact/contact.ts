import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ContactList} from '../../app/constants/contacts';
import { ContactDetailsPage } from '../contact-details/contact-details';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

    public contactList: Array<Object>;

    constructor(public navCtrl: NavController) {
        this.contactList = ContactList;
    }

    goToContactDetail(contact) {
        this.navCtrl.push(ContactDetailsPage, contact);
    }

}
