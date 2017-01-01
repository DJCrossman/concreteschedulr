import { CallNumber, EmailComposer } from 'ionic-native';
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

    onClickCallNumber(numberToCall) {
        CallNumber.callNumber(numberToCall.replace(/\D/g,''), true)
          .then(() => console.log('Launched dialer!'))
          .catch(() => console.log('Error launching dialer'));
    }

    onClickEmailAddress(emailTo) {
        EmailComposer.isAvailable()
            .then((available: boolean) => { if(available) console.log('Email is available!'); })
            .catch(() => console.log('Email unavailable.'));

        let email = {
            to: emailTo,
            subject: 'GNCTR 2017: ',
            body: '',
            isHtml: true
        };

        // Send a text message using default options
        EmailComposer.open(email)
          .then(() => console.log('Launched email client!'))
          .catch((e) => console.log('Error launching email client.\n' + JSON.stringify(e) + '\n'));
    }

}
