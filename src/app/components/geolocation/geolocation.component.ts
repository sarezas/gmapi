import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {} from 'googlemaps';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit {
  @ViewChild('map') mapEl: ElementRef;
  map: google.maps.Map;
  marker: google.maps.Marker;
  cString = 'You';
  infoWindow = new google.maps.InfoWindow;
  constructor() { }

  ngOnInit() {
    // set map properties
    const mapProperties = {
      center: new google.maps.LatLng(54.8985, 23.9036),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // init map
    this.map = new google.maps.Map(this.mapEl.nativeElement, mapProperties);

    // delay prompt for geolocation usage
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const clientPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.infoWindow.setPosition(clientPosition);
          this.infoWindow.setContent('Your position');
          this.infoWindow.open(this.map);
          this.map.setCenter(clientPosition);
          this.marker = new google.maps.Marker({position: clientPosition, map: this.map, draggable: true});
        }, () => {
          handleLocationError(true, this.map, this.map.getCenter());
        });
      } else {
        handleLocationError(false, this.map, this.map.getCenter());
      }
    }, 1500);

    // handle geolocation errors
    function handleLocationError(browserHasGeolocation: boolean, infoWindow: any, pos: any) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(this.map);
    }
  }

}
