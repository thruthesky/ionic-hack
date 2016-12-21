import { Component, OnInit } from '@angular/core';

import { MemberRoutingService } from '../../services/user-routing/member-routing.service';
import { Member } from '../../../../api/philgo-api/v2/member';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(
    private sessionSrvc: MemberRoutingService,
    private member: Member,
  ) { 
    this.sessionSrvc.sessionData = this.member.logged()
   }






  ngOnInit() {
  }

}
