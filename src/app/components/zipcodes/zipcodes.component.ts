import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { Metric } from '../../interface';


@Component({
  selector: 'app-zipcodes',
  templateUrl: './zipcodes.component.html',
  styleUrls: ['./zipcodes.component.css']
})
export class ZipcodesComponent implements OnInit {
  metrics:Metric[];
  
  constructor() { }

  ngOnInit() {
    this.metrics = [
      { zipcode: 8817, value: 10},
      { zipcode: 8816, value: 10},
      { zipcode: 8820, value: 10},
      { zipcode: 8840, value: 10},
      { zipcode: 8821, value: 10},
      { zipcode: 8822, value: 10},
      { zipcode: 8823, value: 10},
      { zipcode: 8824, value: 10},
      { zipcode: 7063, value: 10},
      { zipcode: 7064, value: 10},
      { zipcode: 7065, value: 10},
      { zipcode: 7036, value: 10},
      { zipcode: 7095, value: 10},
      { zipcode: 7094, value: 50},
      { zipcode: 7093, value: 60},
      { zipcode: 7092, value: 70},
      { zipcode: 8837, value: 70},
      { zipcode: 8828, value: 70},
      { zipcode: 8829, value: 70},
      { zipcode: 8831, value: 70},
      { zipcode: 8832, value: 70},
      { zipcode: 8835, value: 70},
    ]
  }
}