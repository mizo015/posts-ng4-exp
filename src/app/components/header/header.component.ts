import { Component, OnInit } from '@angular/core';
import { Router, RouterState, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  appName:string;
  activeRoute:string = '';

  constructor(private router: Router) { 
  	router.events.subscribe(res => this.log(res));
  }
  
  private log(route:object){
      if(route instanceof NavigationEnd)
        this.activeRoute = route.url;
  }
  ngOnInit() {
  	this.appName = 'Lipsuem'
  }
}
