import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data-service/data.service';
import { MemberRoutingService } from '../../services/user-routing/member-routing.service';
import { Router } from '@angular/router';
import { Post, POST_DATA } from '../../../../api/philgo-api/v2/post';
interface stat{
  ratio           : number;
  userID          : string;
  score           : number;
  total_questions : number;
  subjecet        : string;
}
@Component({
  selector: 'app-final',
  templateUrl: './final.component.html'
})
export class FinalComponent implements OnInit {

  today = new Date();

  user_stat: stat = <stat>{}

  constructor(
    private dataService   : DataService,
    private memberService : MemberRoutingService,
    private router        : Router,
    private post          : Post
  ) { 
    this.getting_userStat();
    this.memberService.getLogin();
    if(this.memberService.sessionData){
      this.post_stat();
    }
  }

  ngOnInit() {
  }

  


  getting_userStat(){
    /////getting playerstat data from data service so that the parameters are not shown in url, it'll prevent users from editing the values.
    if( this.dataService.playerStats.score ){
      this.user_stat.score           = this.dataService.playerStats.score;
      this.user_stat.userID          = this.memberService.sessionData.id;
      this.user_stat.total_questions = this.dataService.playerStats.total_questions;
      this.user_stat.ratio           = ( (this.user_stat.score/2)/this.user_stat.total_questions ) * 100;
      this.user_stat.subjecet        = this.dataService.playerStats.subject;
    }
  }








  post_stat(){
    if( ! this.dataService.playerStats ) return;
    ////getting formatted current date/time.
    let date  = (this.today.getMonth() + 1) + "/" + this.today.getDate() + "/" + this.today.getFullYear().toString().substr(2,2); // formatted Date mm/dd/yy
    let hrs   = this.today.getHours() == 0 ? "12" : this.today.getHours() > 12 ? this.today.getHours() - 12 : this.today.getHours();
    let mins  = (this.today.getMinutes() < 10 ? "0" : "") + this.today.getMinutes();
    let ampm  = this.today.getHours() < 12 ? "AM" : "PM";
    
    let formattedTime = hrs + ":" + mins + " " + ampm 


    let data = <POST_DATA>{};
        data.post_id   = 'job';
        data.content   = this.user_stat.score;
        data.subject   = 'user-stat';
        data.category  = 'user-stat';
        data.gid       = 'default';
        data.varchar_1 = this.user_stat.userID;
        data.varchar_2 = this.user_stat.total_questions;
        data.varchar_3 = "%" + this.user_stat.ratio;
        data.varchar_4 = formattedTime;
        data.varchar_5 = this.user_stat.score;
        data.varchar_6 = this.user_stat.subjecet;
        data.varchar_7 = date;
    console.log( 'post stat' );
    this.post.create( data, result =>{
      console.log( 'posted stats ' , result );
    }, error => alert( 'Something went wrong ' + error ) )
  }


}
