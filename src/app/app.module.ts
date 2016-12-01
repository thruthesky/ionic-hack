import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
//import { FormsModule } from '@angular/forms';

import { RootComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BaseModule, ROUTES as BASE_ROUTES } from '../pages/base/base.module';
import { PhilgoApiModule, ROUTES as PHILGO_ROUTES } from '../api/philgo-api/v2/philgo-api-module';



const appRoutes: Routes = BASE_ROUTES;
PHILGO_ROUTES.map( e => appRoutes.unshift( e ) );

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( appRoutes ),
    NgbModule.forRoot(),
    BaseModule,
    PhilgoApiModule
  ],
  bootstrap: [ RootComponent ],
  providers: [ ]
})
export class AppModule {}
