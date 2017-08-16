import { Component, OnInit, Input, ChangeDetectorRef, Renderer2 } from '@angular/core';
import GoogleMapsLoader from 'google-maps'; // only for common js environments 
import { Metric, LatLng, ZipcodePolygons, feature } from '../../interface';
import { API_KEY, POLYGON_DEFAULT_OPTIONS } from '../../constants/map';
import { GeoService } from '../../services/geo.service';
import { getZipcodeFileName, isValidZipcode } from '../../modules/utils';

import {} from '@types/googlemaps';
import { Observable } from 'rxjs';

GoogleMapsLoader.KEY = API_KEY;
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  @Input() zoom: number;
  @Input() height: string;
  @Input() center: LatLng;
  @Input() metrics: Metric[];

  mapContianerEl: Element;
  zipcodeSearchEl: Element;
  map:google.maps.Map;
  options:google.maps.MapOptions;

  selectedZipcode: Metric|null;

  constructor(private Renderer:Renderer2, private geoService:GeoService, private ref: ChangeDetectorRef) { 
    this.selectedZipcode = null;
  }

  ngOnInit() {
  	this.options = {center: this.center, zoom: this.zoom};
  	this.mapContianerEl = this.Renderer.selectRootElement('.mapContainer');
  	this.zipcodeSearchEl = this.Renderer.selectRootElement('#zipcodeSearchEl');
  	this.Renderer.setStyle(this.mapContianerEl, 'height', this.height);

  	GoogleMapsLoader.load((google) => {
  		this.initMap(google);
  	});

  	Observable.fromEvent(this.zipcodeSearchEl, 'input')
  		.map((event:any) => { 
  			return event.currentTarget.value; 
  		})
  		.filter((inputValue:string) => { 
  			return inputValue.length > 3; 
  		})
  		.subscribe(event => {
  			this.zipcodeSearchHandler(event);
  		});

  }

  private mapMetrics(){
  	this.metrics.forEach((metric:Metric) => {
	    this.addZipcodeToMap(metric);
	});
  }

  private addZipcodeToMap(metric:Metric){
  	this.geoService.getZipcodePolygons(getZipcodeFileName(metric.zipcode))
        .subscribe((res:ZipcodePolygons) => {
        	this.mapZipcode(res, metric)
        },
        err => {
        	console.log(err);
        });
  }

  private mapZipcode(res:ZipcodePolygons, metric:Metric){
	const feature:feature = this.getFeature(res, metric);

	feature.polygon.addListener('mouseover', (event) => {
	  this.polygonMouseOverHandler(event, feature);
	});

	feature.polygon.addListener('mouseout', (event) => {
	  this.polygonMouseOutHandler(event, feature);
	});
  }

  private loadMap(google){
    this.map = new google.maps.Map(this.mapContianerEl, this.options);
  }

  private initMap(google){
    this.loadMap(google);
    this.mapMetrics();
  }

  private addPolygonToMap(polygonOptions:google.maps.PolygonOptions): google.maps.Polygon{
  	const polygon = new google.maps.Polygon(polygonOptions);
    polygon.setMap(this.map);

    return polygon;
  }

  private getFeature(ZipcodePolygons:ZipcodePolygons, metric:Metric) : feature{
  	const polygonOptions = Object.assign({}, POLYGON_DEFAULT_OPTIONS, {paths: ZipcodePolygons.bounds});
  	const polygon = this.addPolygonToMap(polygonOptions);

  	return {
	    polygon: polygon,
  		metric: metric,
        type: ZipcodePolygons.type,
        country: ZipcodePolygons.country,
        id: ZipcodePolygons.id,
  	};
  }

  private polygonMouseOverHandler = (event:Event, feature:feature) => {
  	feature.polygon.setOptions({
	    fillColor: 'yellow'
  	});

    this.selectedZipcode = feature.metric; 
    this.ref.detectChanges();
    console.log(this.selectedZipcode)     
  }

  private polygonMouseOutHandler(event:Event, feature:feature){
  	feature.polygon.setOptions({
	    fillColor: 'blue'
  	});

    this.selectedZipcode = null;
    this.ref.detectChanges();
  }

  private zipcodeSearchHandler(zipcode:string){
  	console.log(zipcode);
  	if(isValidZipcode(zipcode)){
  		const randomValue = Math.floor(Math.random() * 100);
  		const metric = {zipcode: Number(zipcode), value: randomValue};
  		
  		this.metrics.push(metric);

  		this.addZipcodeToMap(metric);
  	}else{
  		//update view
  	}
  }
}
