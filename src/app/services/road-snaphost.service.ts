import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class RoadSnapshotService {
    constructor(private http: HttpClient) {}
    getSnap(path: any): any  {
        const apiKey = 'AIzaSyDKF8G_KM0asCWUS4k_mTwcuc7Gu_nOEFg';
        return this.http.get(`https://roads.googleapis.com/v1/snapToRoads?path=${path}&interpolate=true&key=${apiKey}`)
        .toPromise()
        .then((response) => {
          return response['snappedPoints'].map(s => s.location);
        })
        .catch(err => console.log(err));
      }
  }
