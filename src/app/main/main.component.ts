import { Component, OnInit } from '@angular/core';
import { MapboxService } from './mapbox.service';
import * as mapboxgl from 'mapbox-gl';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { HighchartsChartComponent } from 'highcharts-angular';
import { Options } from "highcharts";

// ---Charts Started--
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
// ---Charts Ended--
export interface IGeometry {
  type: string;
  coordinates: number[];
  
}
export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  properties?: any;
  $key?: string;
}
export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;

  constructor(coordinates: any, public properties?: any) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates
    }
  }
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  mapdata: any = [];
  passdata:any=[];
  map!: mapboxgl.Map;
  style = 'mapbox://styles/rsanz/ckusgvkps5b4f17pjw33x31td';
  lat = 37.75;
  lng = -122.41;
  message = 'Hello World!';
  source: any;
  markers: any;
  formatter:any;
  x:any;
  y:any;
  loading = true;

  //--Charts Started--
  // public options: any = {
  //   chart: {
  //     type: 'scatter',
  //     height: 700
  //   },
  //   title: {
  //     text: 'Sample Scatter Plot'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   tooltip: {
  //     formatter: function(): any {
  //       return 'x: ' + Highcharts.dateFormat('%e %b %y %H:%M:%S', newFunction1()) +'y: ' + newFunction2().toFixed(2);
  //       function newFunction1(this: any): number {
  //         return this.x;
  //       }
  //       function newFunction2(this: any): number {
  //         return this.y;
  //       }
  //     }

  //   },
  //   xAxis: {
  //     type: 'datetime',
  //     labels: {
  //       formatter: function(): any {
  //         return Highcharts.dateFormat('%e %b %y', newFunction());
  //         function newFunction(this: any): number {
  //           return this.value;
  //         }
  //       }
  //     }
  //   },
  //   series: [
  //     {
  //       name: 'Normal',
  //       turboThreshold: 500000,
  //       data: []
  //     },
  //     {
  //       name: 'Abnormal',
  //       turboThreshold: 500000,
  //       data: []
  //     }
  //   ]
  // }
  // subscription: Subscription | undefined;
  // data: any;
  //--Charts Ended--

  constructor(public apiservice: MapboxService, private http: HttpClient) {
   
   }

  ngOnInit(): void {
    // this.getmapdata();
    this.buildMap();
    this.initializeMap();
    this.getmapdata();

 

    // Highcharts.chart('container', this.options);
    //--Charts--
        // Set 10 seconds interval to update data again and again
        // const source = interval(10000);

        // Sample API
        // const apiLink = 'https://raw.githubusercontent.com/mysidewalk/interview/master/frontend-engineer/kc-neighborhoods.json';
    
        // this.subscription = source.subscribe(val => this.getApiResponse(apiLink).then(
        //   data => {
        //     const updated_normal_data: any[][] = [];
        //     const updated_abnormal_data: any[][] = [];
        //     this.data.forEach((row: { timestamp: string | number | Date; value: any; Normal: number; }) => {
        //       const temp_row = [
        //         new Date(row.timestamp).getTime(),
        //         row.value
        //       ];
        //       row.Normal === 1 ? updated_normal_data.push(temp_row) : updated_abnormal_data.push(temp_row);
        //     });
        //     this.options.series[0]['data'] = updated_normal_data;
        //     this.options.series[1]['data'] = updated_abnormal_data;
        //     Highcharts.chart('container', this.options);
        //   },
        //   error => {
        //     console.log('Something went wrong.');
        //   })
        // );
    //--Charts--


  }
  getApiResponse(url: string) {
    return this.http.get(url, {})
      .toPromise().then(res => {
        return res;
      });
  }
  private initializeMap() {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 3,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('load', (event) => {

   
      this.map.addSource('firebase', {
         type: 'geojson',
         data:'https://raw.githubusercontent.com/mysidewalk/interview/master/frontend-engineer/kc-neighborhoods.json',
         cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      this.map.addLayer({
        id: 'firebase',
        source: 'firebase',
        type: 'symbol',
        filter: ['has', 'point_count'],
        
        layout: {
          'text-field': '{message}',
          'text-size': 24,
          'text-transform': 'uppercase',
          'icon-image': 'rocket-15',
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      })

    })
  }

  getmapdata() {
    return this.apiservice.mapboxdata().subscribe((data: {}) => {
      this.mapdata = data;
      this.passdata=this.mapdata;
      console.log(this.passdata);
    })
  }
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'area',
      inverted: true
    },
    title: {
      text: 'Chart'
    },
    subtitle : {
       style: {
          position: 'absolute',
          right: '0px',
          bottom: '10px'
       }
    },
    legend : {
       layout: 'vertical',
       align: 'left',
       verticalAlign: 'top',
       x: -150,
       y: 100,
       floating: true,
       borderWidth: 1,
    },

    xAxis:{
       categories: ['Geometry','coordinates','Area','type',
          'properties','area','shid'] 
    },
 
    tooltip : {
       formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
             this.x + ': ' + this.y;
       }
    },
    plotOptions : {
       area: {
          fillOpacity: 0.5 
       }
    },
    credits:{
       enabled: false
    },
    series: [
      {
       data: [1, 2, 3,10,7,18,90],
       type: 'line'
      }, 
    ] 
  }
}


