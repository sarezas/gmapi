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
  constructor() { }

  ngOnInit() {
    const mapProperties = {
         center: new google.maps.LatLng(54.8985, 23.9036),
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapEl.nativeElement, mapProperties);
 }

}
