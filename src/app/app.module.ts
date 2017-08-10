import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { ZipcodesComponent } from './components/zipcodes/zipcodes.component';
import { PostsService } from './services/posts.service';
import { HeaderComponent } from './components/header/header.component';

const AppRoutes:Routes = [
  {path:'', component:PostsComponent},
  {path:'zipcodes', component:ZipcodesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HeaderComponent,
    ZipcodesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    AgmCoreModule.forRoot()
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
