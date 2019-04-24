import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import {} from 'googlemaps';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit {
  @ViewChild('map') mapEl: ElementRef;
  @ViewChild('info') infoEl: ElementRef;
  map: google.maps.Map;
  clientMarker: google.maps.Marker;
  clientPosition: any;
  stationMarker: google.maps.Marker;
  stationPosition = new google.maps.LatLng(54.9299, 23.9969);
  dirService = new google.maps.DirectionsService;
  dirDisplay = new google.maps.DirectionsRenderer;
  cString = 'You';
  infoWindow = new google.maps.InfoWindow;
  arrivalTime = '';

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    // set map properties
    const mapProperties = {
      center: new google.maps.LatLng(54.8985, 23.9036),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // init map
    this.map = new google.maps.Map(this.mapEl.nativeElement, mapProperties);

    // init directions
    this.dirDisplay.setMap(this.map);

    // delay prompt for geolocation usage
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const clientPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.clientPosition = clientPos;
          this.infoWindow.setPosition(clientPos);
          this.infoWindow.setContent('Your position');
          this.infoWindow.open(this.map);
          this.map.setCenter(clientPos);
          this.clientMarker = new google.maps.Marker({position: clientPos, map: this.map, draggable: true});
          this.stationMarker = new google.maps.Marker({position: this.stationPosition, map: this.map});

          // listen for client's position change
          google.maps.event.addListener(this.clientMarker, 'dragend', (posi: any) =>  {
            const lat = posi.latLng.lat().toFixed(4);
            const lng = posi.latLng.lng().toFixed(4);
            console.log(`lat: ${lat}, lng: ${lng}`);
            return this.clientPosition = posi.latLng;
          });

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

  sendHelp() {
    // get directions
    const dirRequest = {
      origin: this.stationPosition,
      destination: this.clientPosition,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.dirService.route(dirRequest, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.dirDisplay.setDirections(response);
        const now = new Date().getTime();
        const arrTimeFromGM = (response.routes[0].legs[0].duration.value * 1000);
        const arrivalTimeUTC = new Date(now + arrTimeFromGM);
        this.arrivalTime = arrivalTimeUTC.getHours() + ':' +
          (arrivalTimeUTC.getMinutes() < 10 ? '0' + arrivalTimeUTC.getMinutes() : arrivalTimeUTC.getMinutes());
        console.log(this.arrivalTime);
        this.renderer.setProperty(
          this.infoEl.nativeElement, 'innerHTML',  `Tech. pagalbos preliminarus atvykimo laikas ${this.arrivalTime}`);
        // do more magic with the renderer
        // animate movement
      } else {
        console.log('Directions could not be obtained ' + status);
      }
    });
  }

}
