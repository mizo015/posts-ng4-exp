import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import GoogleMapsLoader from 'google-maps'; // only for common js environments 
import { Renderer2 } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Metric, LatLng, ZipcodePolygons, feature } from '../../interface';
import { API_KEY, POLYGON_DEFAULT_OPTIONS } from '../../constants/map';
import { GeoService } from '../../services/geo.service';
import { getZipcodeFileName } from '../../modules/utils';

import {} from '@types/googlemaps';

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
  map:google.maps.Map;
  options:google.maps.MapOptions;
  zipcodeSearchModel:string;

  selectedZipcode: Metric|null;

  constructor(private Renderer:Renderer2, private geoService:GeoService, private ref: ChangeDetectorRef) { 
    this.selectedZipcode = null;
  }

  ngOnInit() {
  	this.options = {center: this.center, zoom: this.zoom};
  	this.mapContianerEl = this.Renderer.selectRootElement('.mapContainer');
  	this.Renderer.setStyle(this.mapContianerEl, 'height', this.height);

  	GoogleMapsLoader.load((google) => {
  		this.initMap(google);
  	}, this);
  }

  private mapMetrics(){
  	this.metrics.forEach((metric:Metric) => {
	    this.geoService.getZipcodePolygons(getZipcodeFileName(metric.zipcode))
	        .subscribe((res:ZipcodePolygons) => {
	            const feature:feature = this.getFeature(res, metric);

            	feature.polygon.addListener('mouseover', (event) => {
            		this.polygonMouseOverHandler(event, feature);
            	});

            	feature.polygon.addListener('mouseout', (event) => {
            		this.polygonMouseOutHandler(event, feature);
            	});
	        }, (err) => {
	            console.log("Polygons not found, URL: ", err);
	        });
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

  private polygonMouseOverHandler = (event, feature:feature) => {
  	feature.polygon.setOptions({
	    fillColor: 'yellow'
  	});

    this.selectedZipcode = feature.metric; 
    this.ref.detectChanges();
    console.log(this.selectedZipcode)     
  }

  private polygonMouseOutHandler(event, feature:feature){
  	feature.polygon.setOptions({
	    fillColor: 'blue'
	  });

    this.selectedZipcode = null;
  }
}
