import { Component } from '@angular/core';

import { IonicApi } from '../../../api/ionic-api/ionic-api';



@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  title: string = "Home Page";
  constructor( private ionic: IonicApi ) {
    
//    ionic.registerPushNotfication();


  }

}
