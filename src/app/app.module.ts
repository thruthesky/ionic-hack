import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './app.component';



import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { HomePage } from '../pages/home/home';
import { HelpPage } from '../pages/help/help';
import { AboutPage } from '../pages/about/about';
import { FileNotFoundPage } from '../pages/file-not-found/file-not-found';

const appRoutes: Routes = [
  { path: 'help', component: HelpPage },
  { path: 'user/login', component: HelpPage },
  { path: 'about', component: AboutPage },
  { path: '', component: HomePage },
  { path: '**', component: FileNotFoundPage }
];

@NgModule({
  declarations: [
    RootComponent,
    HomePage,
    AboutPage,
    HelpPage,
    FileNotFoundPage
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( appRoutes ),
    NgbModule.forRoot()
  ],
  bootstrap: [ RootComponent ],
  providers: [ ]
})
export class AppModule {}
