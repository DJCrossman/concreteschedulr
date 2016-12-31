import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import * as Moment from 'moment';
import {CalendarList} from '../../app/constants/calendar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public calendarList: Array<Object>;

    constructor(public navCtrl: NavController) {
        CalendarList.forEach((i) => {
            Object.assign(
                i,
                {startDateFormatted: Moment(i.startDate).format('h:mma MMMM Do, YYYY')}
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
    }

}
