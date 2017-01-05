import { Component } from '@angular/core';

import * as moment from 'moment';
import { NavController } from 'ionic-angular';
import { EventDetailsPage } from '../event-details/event-details';
import { ConferenceService } from '../../providers/conference-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ConferenceService]
})
export class HomePage {

    public calendarEvents: any[];
    public groupedCalendarEvents: any[];

    constructor(public navCtrl: NavController, public conferenceService: ConferenceService) {
        this.loadCalendarEvents();
    }

    loadCalendarEvents() {
        this.conferenceService.load().then(data => {
            data.calendar.forEach((i) => {
                Object.assign(
                    i,
                    {
                        startDateFormatted: moment(i.startDate).format('h:mma MMMM Do, YYYY'),
                        endDateFormatted: moment(i.endDate).format('h:mma MMMM Do, YYYY')
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
        });
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

}
