import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { firebaseObjectToArray } from '../utilities';
import 'rxjs/add/operator/map';

const Endpoint = 'https://concreteschedulr-1480880565642.firebaseio.com/.json';

@Injectable()
export class FirebaseDataService {
    _data: any;

    constructor(public http: Http) { }

    private get data(): any {
        return this._data;
    }

    private set data(data: any) {
        this._data = data;
    }

    load() {
      return new Promise(resolve => {
        this.http.get(Endpoint)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
    }

    get calendar() {
      return Array.isArray(this.data.calendar) ? this.data.calendar : firebaseObjectToArray(this.data.calendar);
    }

    get contacts() {
      return Array.isArray(this.data.contacts) ? this.data.contacts : firebaseObjectToArray(this.data.contacts);
    }

    get settings() {
      return this.data.settings;
    }

}
