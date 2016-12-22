import { Component, OnInit } from '@angular/core';
import { Post, SEARCH_QUERY_DATA } from '../../../../api/philgo-api/v2/post';
import { DataService } from '../../services/data-service/data.service';
import { Member } from '../../../../api/philgo-api/v2/member';
import { MemberRoutingService } from '../../services/user-routing/member-routing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examhome',
  templateUrl: './examhome.component.html'
})
export class ExamhomeComponent implements OnInit {
  enabled:boolean = false;
  selected_category:string;
  category_data = [];
  subject_data = [];

  constructor(
    private post          : Post,
    private router        : Router,
    private dataService   : DataService,
    private memberService : MemberRoutingService,
    private member        : Member
  ) {
    // if( this.memberService.checkLoginData() == true ) this.router.navigate( [ 'quiz' ] );
    this.getSubject();
   }







  ngOnInit() {
  }






  getSubject( ){
    let data = <SEARCH_QUERY_DATA>{};
        data.fields   = "idx, content";
        data.from     = "sf_post_data";
        data.where    = "post_id='job' AND subject='subject' AND varchar_1 ='true'";
      this.post.search( data, fetchedsubject =>{
        this.subject_data = fetchedsubject.search;
        if(this.subject_data.length == 0) this.enabled = false;
        else this.enabled = true;
        console.log( 'fetched subject', this.subject_data.length )
      }, error =>alert( 'something went wrong' + error ) )
  }




  onChangeGetExam( subject_idx ){
    this.router.navigate( [ 'quiz/exam' ] );
    this.dataService.subjectIDX.idx = subject_idx;
  }
}
