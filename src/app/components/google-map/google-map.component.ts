import { Component, OnInit, Input } from '@angular/core';
import GoogleMapsLoader from 'google-maps'; // only for common js environments 
import { Renderer2 } from '@angular/core';
import { Metric, LatLng, ZipcodePolygons, feature } from '../../interface';
import { API_KEY } from '../../constants/map';
import { GeoService } from '../../services/geo.service';

import {} from '@types/googlemaps';

GoogleMapsLoader.KEY = API_KEY;
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];

const POLYGON_DEFAULT_OPTIONS:google.maps.PolygonOptions = {
    fillOpacity: 0.6,
    fillColor: 'blue',
    strokeWeight: 1,
    strokeColor: 'white',
    strokeOpacity: 1,
    clickable: true
}

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

  constructor(private Renderer:Renderer2, private geoService:GeoService) { }

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
	    this.geoService.getZipcodePolygons('0'+metric.zipcode)
	        .subscribe((res:ZipcodePolygons) => {
	            const feature:feature = this.getFeature(res, metric);
                const polygon:google.maps.Polygon = this.addPolygonToMap(feature.polygon);

            	polygon.addListener('mouseover', (event) => {
            		this.polygonMouseOverHandler(event, polygon);
            	});

            	polygon.addListener('mouseout', (event) => {
            		this.polygonMouseOutHandler(event, polygon);
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
  	let polygonOptions = Object.assign({}, POLYGON_DEFAULT_OPTIONS, {paths: ZipcodePolygons.bounds});
  	
  	return {
	    polygon:polygonOptions,
  		metric: metric,
        type: ZipcodePolygons.type,
        country: ZipcodePolygons.country,
        id: ZipcodePolygons.id,
  	};
  }

  polygonMouseOverHandler(event, polygon){
  	polygon.setOptions({
	    strokeWeight: 3,
	    strokeColor: '#c4c4c4'
	});
  }

  polygonMouseOutHandler(event, polygon){
  	polygon.setOptions({
	    strokeWeight: 1,
	    strokeColor: 'white'
	});
  }
}
