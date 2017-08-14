import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { POLYGON_BASE_URL } from '../constants/map';

import 'rxjs/add/operator/map';

@Injectable()
export class GeoService {

  constructor(private http:Http) { 
  	console.log('geo service here!!')
  }

  getZipcodePolygons(zipcode:string){
  	return this.http.get(`${POLYGON_BASE_URL}/${zipcode}.json`)
  		.map(res => res.json());
  }
}
