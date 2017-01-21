import { Component } from '@angular/core';

import * as moment from 'moment';
import { NavController, LoadingController } from 'ionic-angular';
import { EventDetailsPage } from '../event-details/event-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public calendarEvents: any[];
    public groupedCalendarEvents: any[];

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController) {
        navCtrl.parent.viewCtrl.instance.ready().then(() => {
            this.loadCalendarEvents(navCtrl.parent.viewCtrl.instance.data);
        });
    }

    loadCalendarEvents(data) {
        data.calendar.forEach((i) => {
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
        data.calendar.sort((a,b) => {
            let aDate = new Date(a.startDate);
            let bDate = new Date(b.startDate);
            return aDate < bDate ? -1 : (aDate > bDate ? 1 : 0);
        });
        this.calendarEvents = data.calendar.filter((a) => {
            let aDate = new Date(Date.now());
            let bDate = new Date(a.endDate);
            return aDate < bDate;
        });
        this.groupedCalendarEvents = this.groupEventsByDay(this.calendarEvents);
    }

    goToEventDetail(event) {
        this.navCtrl.push(EventDetailsPage, event);
    }

    groupEventsByDay(calendar) {
        let eventGroupEvents = [];
        let groupBy = (xs, key) => {
            return xs.reduce((rv, x) => {
                (rv[moment(x[key]).format('LL')] = rv[moment(x[key]).format('LL')] || []).push(x);
                return rv;
            }, {});
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
