import { Component } from '@angular/core';

import * as moment from 'moment';
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

    loadCalendarEvents(calendar) {
        calendar.forEach((i) => {
            let start = moment(i.startDate).format('h:mma');
            let end = moment(i.endDate).format('h:mma');
            let range = moment(i.startDate).isSame(i.endDate, 'day') ?
                [moment(i.startDate).format('ddd MMMM Do, h:mma'), moment(i.endDate).format('h:mma')].join(' - ') :
                [moment(i.startDate).format('ddd MMMM Do, YYYY, h:mma'), moment(i.endDate).format('ddd MMMM Do, YYYY, h:mma')].join(' - ');
            Object.assign(
                i,
                {
                    startDateFormatted: start,
                    endDateFormatted: end,
                    dateRangeFormatted: range
                }
            );
        });
        calendar.sort((a,b) => {
            let aDate = new Date(a.startDate);
            let bDate = new Date(b.startDate);
            return aDate < bDate ? -1 : (aDate > bDate ? 1 : 0);
        });
        // this.events = calendar.filter((a) => {
        //     let aDate = new Date(Date.now());
        //     let bDate = new Date(a.endDate);
        //     return aDate < bDate;
        // });
        this.groupedEvents = this.getGroupedEventsByDay(this.events);
    }

    goToEventDetail(event) {
        this.navCtrl.push(EventDetailsPage, event);
    }

    getGroupedEventsByDay(calendar) {
        let eventGroupEvents = [];
        let groupBy = (xs, key) => {
            return xs ? xs.reduce((rv, x) => {
                (rv[moment(x[key]).format('LL')] = rv[moment(x[key]).format('LL')] || []).push(x);
                return rv;
            }, {}) : '';
        };
        let groupedObject = groupBy(calendar, 'startDate');
        Object.keys(groupedObject).forEach((k) => {
            eventGroupEvents.push({label: k, group: groupedObject[k]});
        });
        return eventGroupEvents.sort((a,b) => {
            let aDate = new Date(a.label);
            let bDate = new Date(b.label);
            return aDate < bDate ? -1 : (aDate > bDate ? 1 : 0);
        });
    }

    get isVotingOpen() {
        let today = new Date();
        return today > new Date('2017-02-11T14:15:00Z') && today < new Date('2017-02-11T22:00:00Z');
    }

}
