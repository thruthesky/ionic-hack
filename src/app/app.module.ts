import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
//import { FormsModule } from '@angular/forms';

import { IonicApiModule } from '../api/ionic-api/ionic-api.module';

import { RootComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { BaseModule, ROUTES as BASE_ROUTES } from '../pages/base/base.module';

import { ForumModule, ROUTES as FORUM_ROUTES } from '../pages/forum/forum.module';

import { PhilgoApiModule, ROUTES as PHILGO_ROUTES } from '../api/philgo-api/v2/philgo-api-module';


const appRoutes: Routes = BASE_ROUTES;
FORUM_ROUTES.map( e => appRoutes.unshift( e ) );
PHILGO_ROUTES.map( e => appRoutes.unshift( e ) );

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( appRoutes ),
    IonicApiModule,
    NgbModule.forRoot(),
    BaseModule,
    PhilgoApiModule,
    ForumModule
  ],
  bootstrap: [ RootComponent ],
  providers: [ ]
})
export class AppModule {}


