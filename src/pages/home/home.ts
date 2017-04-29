import { Component } from '@angular/core';

import * as moment from 'moment-timezone';
import { NavController, LoadingController } from 'ionic-angular';
import { EventDetailsPage } from '../event-details/event-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public events: any[];
    public groupedEvents: any[] = [];
    public settings: any = {};

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController) {
        navCtrl.parent.viewCtrl.instance.ready().then(() => {
            let service = this.navCtrl.parent.viewCtrl.instance.service;
            this.settings = service.settings;
            this.loadCalendarEvents(service.calendar);
        });
    }

    loadCalendarEvents(calendar: any[]) {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      let _tz = this.settings.timezone;
      loader.present();

      this.events = calendar.filter((a) => {
        let aDate = moment(new Date()).tz(_tz);
        let bDate = moment(a.endDate).tz(_tz);
        return aDate < bDate;
      });
      this.events.forEach((i) => {
        let start = moment(i.startDate).tz(_tz);
        let end = moment(i.endDate).tz(_tz);
        let range = moment(i.startDate).isSame(i.endDate, 'day') ?
            (i.startDate !== i.endDate ?
              [start.format('ddd MMMM Do, h:mma'), end.format('h:mma')].join(' - ') :
              start.format('ddd MMMM Do, h:mma')) :
            [start.format('ddd MMMM Do, YYYY, h:mma'), end.format('ddd MMMM Do, YYYY, h:mma')].join(' - ');
        Object.assign(
            i,
            {
                startDateFormatted: start.format('h:mma'),
                endDateFormatted: end.format('h:mma'),
                dateRangeFormatted: range
            }
        );
      });
      this.events.sort((a,b) => {
        let aDate = moment(a.startDate).tz(_tz);
        let bDate = moment(b.startDate).tz(_tz);
        return aDate < bDate ? -1 : (aDate > bDate ? 1 : 0);
      });
      this.groupedEvents = this.getGroupedEventsByDay(this.events);
      loader.dismiss();
    }

    goToEventDetail(event) {
      this.navCtrl.push(EventDetailsPage, event);
    }

    getGroupedEventsByDay(calendar) {
      let eventGroupEvents = [];
      let _tz = this.settings.timezone;
      let groupBy = (xs, key) => {
        return xs ? xs.reduce((rv, x) => {
            (rv[moment(x[key]).tz(_tz).format('LL')] = rv[moment(x[key]).tz(_tz).format('LL')] || []).push(x);
            return rv;
        }, {}) : '';
      };
      let groupedObject = groupBy(calendar, 'startDate');
      Object.keys(groupedObject).forEach((k) => {
        eventGroupEvents.push({label: k, group: groupedObject[k]});
      });
      return eventGroupEvents.sort((a,b) => {
        let aDate = moment(a.startDate).tz(_tz);
        let bDate = moment(b.startDate).tz(_tz);
        return aDate < bDate ? -1 : (aDate > bDate ? 1 : 0);
      });
    }

    load(refresher) {
      setTimeout(() => {
        let service = this.navCtrl.parent.viewCtrl.instance.service;
        service.load().then(() => {
          this.settings = service.settings;
          this.loadCalendarEvents(service.calendar);
        });
        refresher.complete();
      }, 2000);
    }

    get isVotingOpen() {
      let _tz = this.settings.timezone;
      if (!this.settings.voting) return false;
      if (!this.settings.voting.startDate && this.settings.voting.endDate) return false;
      let today = moment().tz(_tz);
      return today > moment(this.settings.voting.startDate).tz(_tz) && today < moment(this.settings.voting.endDate).tz(_tz);
    }

}
