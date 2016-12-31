import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng
} from 'ionic-native';
import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-navigate',
  templateUrl: 'navigate.html'
})

export class NavigatePage {

    map: GoogleMap;

    constructor(public navCtrl: NavController, public platform: Platform) {
        platform.ready().then(() => {
            if(platform.is('ios') || platform.is('android')) this.loadMap();
        });
    }

    loadMap() {
        let location = new GoogleMapsLatLng(49.8900202,-97.1436709);

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
