import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const Endpoint = 'https://concreteschedulr-1480880565642.firebaseio.com/.json';

@Injectable()
export class ConferenceService {
    public data: any;

    constructor(public http: Http) { }

    load() {
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
            this.http.get(Endpoint)
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });
    }

}
