import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng
} from 'ionic-native';
import { Component } from '@angular/core';

import { NavController, NavParams, Platform } from 'ionic-angular';
import { DefaultLocation } from '../../app/constants/location';

@Component({
  selector: 'page-navigate',
  templateUrl: 'navigate.html'
})

export class NavigatePage {

    public eventLocation: any;
    map: GoogleMap;

    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
        this.eventLocation = navParams.data;
        platform.ready().then(() => {
            if(platform.is('ios') || platform.is('android')) this.loadMap();
        });
    }

    loadMap() {
        let lat = DefaultLocation.lat;
        let lng = DefaultLocation.lng;
        if(this.eventLocation) {
            lat = this.eventLocation.lat || DefaultLocation.lat;
            lng = this.eventLocation.lng || DefaultLocation.lng;
        }
        let location = new GoogleMapsLatLng(lat, lng);

        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
    }
}
