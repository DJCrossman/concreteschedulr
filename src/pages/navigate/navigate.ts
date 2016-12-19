import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker
} from 'ionic-native';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-navigate',
  templateUrl: 'navigate.html'
})

export class NavigatePage {

    constructor(public navCtrl: NavController) { }

    ngAfterViewInit() {
        this.loadMap();
    }

    loadMap() {
        // create a new map by passing HTMLElement
        let element: HTMLElement = document.getElementById('map');

        let map = new GoogleMap(element);

        // listen to MAP_READY event
        map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

        // create LatLng object
        let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904,-89.3809802);

        // create CameraPosition
        let position: CameraPosition = {
            target: ionic,
            zoom: 18,
            tilt: 30
        };

        // move the map's camera to position
        map.moveCamera(position);

        // create new marker
        let markerOptions: GoogleMapsMarkerOptions = {
            position: ionic,
            title: 'Ionic'
        };
        map.addMarker(markerOptions)
            .then((marker: GoogleMapsMarker) => {
                marker.showInfoWindow();
            }, ({error}) => {
                console.log(error);
            });
    }
}
