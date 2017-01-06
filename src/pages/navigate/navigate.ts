import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 GoogleMapsAnimation,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker
} from 'ionic-native';
import { Component } from '@angular/core';

import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { DefaultLocation } from '../../app/constants/location';
import { ConferenceService } from '../../providers/conference-service';

@Component({
  selector: 'page-navigate',
  templateUrl: 'navigate.html',
  providers: [ConferenceService]
})

export class NavigatePage {

    public eventLocation: any;
    map: GoogleMap;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public platform: Platform,
        public conferenceService: ConferenceService,
        public loadingCtrl: LoadingController) { }

    ionViewDidEnter() {
        this.eventLocation = this.navCtrl.parent.viewCtrl.instance.data;
        if(this.map) {
            if(this.platform.is('core')) return;
            this.map.one('resize');
        }
        this.platform.ready().then(() => { this.loadMap(); });
    }

    loadMap() {
        let lat = DefaultLocation.lat;
        let lng = DefaultLocation.lng;
        if(this.eventLocation) {
            console.log("Loading: " + this.eventLocation.name);
            lat = this.eventLocation.lat || DefaultLocation.lat;
            lng = this.eventLocation.lng || DefaultLocation.lng;
        }
        let location = new GoogleMapsLatLng(lat, lng);

        if(this.map && this.eventLocation) {
            this.setEventLocation(location, 15);
            return;
        }

        this.initializeMap({
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
        if(this.platform.is('core')) return;
        let loading = this.loadingCtrl.create({ spinner: 'circles' });
        loading.present();
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            this.onMapLoad().then(() => {
                loading.dismiss();
            });
        });
    }

    initializeMap(options) {
        this.map = new GoogleMap('map', options);
    }

    onMapLoad() {
        console.log('Map is ready!');
        return this.conferenceService.load().then(data => {
            this.map.clear();
            this.getLocationList(data.calendar).forEach((l) => {
                let markerOptions: GoogleMapsMarkerOptions = {
                    position: new GoogleMapsLatLng(l.lat, l.lng),
                    animation: GoogleMapsAnimation.DROP,
                    title: l.name
                };
                this.addMarkerToMap(markerOptions);
            });
        });
    }

    addMarkerToMap(markerOptions) {
        this.map.addMarker(markerOptions)
            .then((marker: GoogleMapsMarker) => {
                console.log('Marker dropped.');
            });
    }

    setEventLocation(latLng, value) {
        this.map.setCenter(latLng);
        this.map.setZoom(value);
    }

    getLocationList(calendar) {
        let locationList = [];
        calendar.filter((l) => { return l.location;}).forEach((c, i) => {
            if(!locationList.some((s) => {return s.name === c.location.name }))
                locationList.push(c.location);
        });
        return locationList;
    }
}
