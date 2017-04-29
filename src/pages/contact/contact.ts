import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { ContactDetailsPage } from '../contact-details/contact-details';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

    public contacts: any[];
    public socialMedia: any = {};

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
        this.loadContacts();
    }

    loadContacts() {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      this.navCtrl.parent.viewCtrl.instance.ready().then(() => {
        let service = this.navCtrl.parent.viewCtrl.instance.service;
        this.socialMedia = service.settings.socialMedia;
        this.contacts = service.contacts;
        loader.dismiss();
      });
    }

    goToContactDetail(contact) {
        this.navCtrl.push(ContactDetailsPage, contact);
    }

}
