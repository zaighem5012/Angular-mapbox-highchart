import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import {HttpClient} from "@angular/common/http";
import { GeoJson } from './map';


@Injectable({
  providedIn: 'root'
})

export class MapboxService {
  baseurl: string = "https://raw.githubusercontent.com/mysidewalk/interview/master/frontend-engineer/kc-neighborhoods.json";
  
  constructor(private http: HttpClient) {
    (mapboxgl as typeof mapboxgl).accessToken= environment.mapbox.accessToken;
    
  }
  mapboxdata(){
    return this.http.get(this.baseurl);
  }
 
  createMarker(data: GeoJson) {
    return this.http.get(this.baseurl);
  }
  
  // getMarkers() {
  //   const geoJson = [{
  //     'type': 'Feature',
  //     'geometry': {
  //       'type': 'Point',
  //       'coordinates': ['80.20929129999999', '13.0569951']
  //     },
  //     'properties': {
  //       'message': 'Chennai'
  //     }
  //   }, {
  //     'type': 'Feature',
  //     'geometry': {
  //       'type': 'Point',
  //       'coordinates': ['77.350048', '12.953847' ]
  //     },
  //     'properties': {
  //       'message': 'bangulare'
  //     }
  //   }];
  //   return geoJson;
  // }
 

}
