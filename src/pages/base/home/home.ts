import { Component } from '@angular/core';


import { Member, MEMBER_LOGIN_DATA } from '../../../api/philgo-api/v2/member';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  title: string = "Home Page";
    login: MEMBER_LOGIN_DATA = <MEMBER_LOGIN_DATA> {};
  constructor(
    private member: Member
    ) {
    
//    ionic.registerPushNotfication();

    member.getLogin( x => this.login = x );
    // setTimeout(() => this.login = this.member.logged(), 10);

    //this.testPush();
  }

  testPush() {
    
  }

  onClickRegisterPushNotification() {
    
  }



}
