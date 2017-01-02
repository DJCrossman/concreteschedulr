import { Component } from '@angular/core';

import * as moment from 'moment';
import { NavController } from 'ionic-angular';
import { CalendarList } from '../../app/constants/calendar';
import { EventDetailsPage } from '../event-details/event-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public calendarList: any[];
    public groupedCalendarList: any[];

    constructor(public navCtrl: NavController) {
        CalendarList.forEach((i) => {
            Object.assign(
                i,
                {
                    startDateFormatted: moment(i.startDate).format('h:mma MMMM Do, YYYY'),
                    endDateFormatted: moment(i.endDate).format('h:mma MMMM Do, YYYY')
                }
            );
        });
        CalendarList.sort((a,b) => {
            let aDate = new Date(a.startDate);
            let bDate = new Date(b.startDate);
            return aDate < bDate ? -1 : (aDate > bDate ? 1 : 0);
        });
        this.calendarList = CalendarList.filter((a) => {
            let aDate = new Date(Date.now());
            let bDate = new Date(a.endDate);
            return aDate < bDate;
        });
        this.groupedCalendarList = this.groupEventsByDay(this.calendarList);
    }

    goToEventDetail(event) {
        this.navCtrl.push(EventDetailsPage, event);
    }

    groupEventsByDay(calendar) {
        let eventGroupList = [];
        let groupBy = (xs, key) => {
            return xs.reduce((rv, x) => {
                (rv[moment(x[key]).format('LL')] = rv[moment(x[key]).format('LL')] || []).push(x);
                return rv;
            }, {});
        };
        let groupedObject = groupBy(calendar, 'startDate');
        Object.keys(groupedObject).forEach((k) => {
            eventGroupList.push({label: k, group: groupedObject[k]});
        });
        return eventGroupList.sort((a,b) => {
            let aDate = new Date(a.label);
            let bDate = new Date(b.label);
            return aDate < bDate ? -1 : (aDate > bDate ? 1 : 0);
        });
    }

}
