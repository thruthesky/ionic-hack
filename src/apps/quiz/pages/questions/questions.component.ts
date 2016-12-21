import { Component, OnInit } from '@angular/core';
import { Post, POST_DATA, SEARCH_QUERY_DATA } from '../../../../api/philgo-api/v2/post'
import { DataService } from '../../services/data-service/data.service';
import { MemberRoutingService } from '../../services/user-routing/member-routing.service';
import { ActivatedRoute } from'@angular/router';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html'
})
export class QuestionsComponent implements OnInit {
  
  question_data = [];
  exam_idx:number;
  activeCheck:boolean = true;
  idx:number;
  categoryIDX:number;
  categoryInfo: POST_DATA = <POST_DATA>[];
  switch:boolean = false;
  subjectInfo: POST_DATA  = <POST_DATA>[];
  constructor(
    private activatedRoute  : ActivatedRoute,
    private post            : Post,
    private dataService     : DataService,
    private memberService   : MemberRoutingService
  ) { 
    this.memberService.adminData();
    this.idx = this.activatedRoute.snapshot.params['idx'];
    console.log('idx' + this.idx)

    this.getSubject();

    this.getQuestions();
  }

  ngOnInit() {
  }






  getSubject(){
    if( this.idx ){
      console.log('idx', this.idx)
      this.post.load( this.idx, subject =>{
        console.log( "SELECTED Subject()", subject );
        this.subjectInfo = subject.post;
        console.log('subj info idx ' , this.subjectInfo.idx)
        this.activeCheck = this.dataService.check_status( this.subjectInfo.varchar_1 );
        console.log( 'checking data' , this.subjectInfo )

      }, err => alert( "Something went wrong " + err ) );
      return
    }

  }



  onClickAddQuestions( ){
    console.log('passing idx',this.idx)
    this.switch = true;
    this.dataService.subjectIDX.idx = this.idx;
  }



  onClickEdit( question, index ){

    this.switch = true;
    this.dataService.question_data = question;
    this.dataService.question_index = index;

  }
  editComponentOnCancel(){
    this.switch = false;

  }


  getQuestions(){
    let data = <SEARCH_QUERY_DATA>{}
        data.fields = "idx, content, varchar_1, varchar_2, varchar_3, varchar_4, varchar_5, user_name, varchar_6";
        data.from   = "sf_post_data";
        data.where  = "post_id='job' AND subject='exam' AND varchar_6='" + this.idx + "'";
    this.post.search( data, question_result =>{
      this.question_data = question_result.search;
      console.log('checking exam' , this.question_data)
    }, err =>{})
  }

    editComponentOnSuccess() {
        this.switch = false;
        
    }






  onClickDelete( idx, index ){
    let confirmDelete = confirm( 'Are you sure you want to delete this?' );
    if( confirmDelete == false ) return;

      console.log( 'deleting' , idx );
      this.post.delete( idx, res=>{
        console.info('deleted ' + idx, ' res ' , res);
        this.question_data.splice( index, 1 );

      }, error=>alert( 'error '+ error ) )

    
  }
  

}
