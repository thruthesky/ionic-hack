import { Component, OnInit } from '@angular/core';
 import { MemberRoutingService } from '../../../services/user-routing/member-routing.service';
 import { Member } from '../../../../../api/philgo-api/v2/member';
 import { Router } from '@angular/router';
 
 @Component({
   selector: 'quiz-base-nav',
   templateUrl: 'quiz-base-nav.html'
 })
 export class QuizBaseNavComponent implements OnInit {
 
   constructor(
     private sessionSrvc: MemberRoutingService,
     private router: Router,
     private member: Member
   ) {
    //  this.sessionSrvc.adminData();
    //  this.sessionSrvc.checkLoginData();
     this.sessionSrvc.sessionData = this.member.logged();
    }
 
   ngOnInit() {
   }
 
 
   onClickLogout(){
     this.member.logout();
     this.sessionSrvc.logged = false;
     this.sessionSrvc.sessionData = null;
     this.router.navigate(['/user/login']);
   }
 
 
 }