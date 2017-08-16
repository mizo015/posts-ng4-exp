import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { ZipcodesComponent } from './components/zipcodes/zipcodes.component';
import { HeaderComponent } from './components/header/header.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';

import { PostsService } from './services/posts.service';
import { GeoService } from './services/geo.service';

const AppRoutes:Routes = [
  {path:'', component:PostsComponent},
  {path:'zipcodes', component:ZipcodesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HeaderComponent,
    ZipcodesComponent,
    GoogleMapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    AgmCoreModule.forRoot(),
  ],
  providers: [PostsService, GeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
