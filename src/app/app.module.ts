import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
//import { FormsModule } from '@angular/forms';

import { RootComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BaseModule, ROUTES as BASE_ROUTES } from '../pages/base/base.module';


const appRoutes: Routes = BASE_ROUTES;
//BASE_ROUTES.map( e => appRoutes.unshift( e ) );

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( appRoutes ),
    NgbModule.forRoot(),
    BaseModule
  ],
  bootstrap: [ RootComponent ],
  providers: [ ]
})
export class AppModule {}
