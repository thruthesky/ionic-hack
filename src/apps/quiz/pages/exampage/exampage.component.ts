import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post, SEARCH_QUERY_DATA, POST_RESPONSE } from '../../../../api/philgo-api/v2/post';
import { Router } from '@angular/router';

import { DataService } from '../../services/data-service/data.service';
import { MemberRoutingService } from '../../services/user-routing/member-routing.service';

import * as _ from 'lodash';




@Component({
  selector: 'app-exampage',
  templateUrl: './exampage.component.html'
})
export class ExampageComponent implements OnInit, OnDestroy {

  today = new Date();

  min:number = 0;
  sec:number = 0;
  hr:number  = 0;

  radio;
  current_choices;
  score: number = 0;
  validate;
  loading:boolean = true;
  ctr: number = 0;
  ctrRandom:number;
  subject_data = <POST_RESPONSE>{};
  exam_data =[];
  subject:number;
  questionCount;
  current_question;
  duration:number;
  countdown:string;
  private time;
  constructor(
    private dataService : DataService,
    private post        : Post,
    private router      : Router,
    private authSrvc    : MemberRoutingService
  ) {
    this.subject = this.dataService.subjectIDX.idx;///getting the subject IDX passed from dataservice
    if( this.subject ){
      this.getExam();
      this.getSubject();

    }else{
      alert( 'select subject first' );
      this.router.navigate( [ 'home' ] );
    }
    

    console.log( 'timer' , this.countdown )
   }


  ngOnInit() {
    this.time = setInterval( ()=>{
      this.startTimer(  );
    }, 1000 )
  }








  ngOnDestroy() {
    clearInterval(this.time);///stoping and clearing timer onDestroy it'll stop the timer onDestroy or whenever the user leaves the component.
  }







  getSubject(){
    this.post.load( this.subject, result =>{
      this.subject_data = result;
      console.log('check content', this.subject_data.post.content)
      console.log('category ', result )
      this.min = this.subject_data.post.varchar_3;
    }, error =>{})
  }




  startTimer(){

    ///checking and computing mins if it's value is 60 or more then convert 60mins : 1hr
    if( this.min >= 60 ){
      this.hr = Math.floor( this.min / 60 );
      console.log('checking value ', Math.floor( this.min / 60 ))
      this.min =  this.min - (60 * this.hr );
      
      console.log('Hour ', this.hr )
    }

    if( this.sec == 0){
      
      if( this.min != 0 ){
        this.min--;
        this.sec = 60;
      } else{
        if( this.hr > 0 ){
        this.hr--;
        this.min = 59;
        this.sec = 60;
        }
      }
      if( this.hr==0 && this.sec ==0 &&this.min ==0 ) this.onClickFinish();
      
      
      console.log( 'check minutes ',this.min )
    }
    this.sec -- ;
    ///formating Hours, Minutes, and Seconds for timer display
    let hrDisplay  = this.hr  >= 10 ? "" + this.hr  : "0" + this.hr;
    let minDisplay = this.min >= 10 ? "" + this.min : "0" + this.min;
    let secDisplay = this.sec >= 10 ? "" + this.sec : "0" + this.sec;

    this.countdown = hrDisplay+ ":" +minDisplay + ":" + secDisplay;

    console.log( 'timer' , this.countdown )

  }
 




  getExam(){

    let data = <SEARCH_QUERY_DATA>{};
        data.fields   = "idx, content, varchar_1, varchar_2, varchar_3, varchar_4, varchar_5";
        data.from     = "sf_post_data";
        data.where    = "post_id='job' AND category='OES' AND subject='exam' AND varchar_6 ='" + this.subject + "'";///where clause| gets only the set of questions for the selected subject.
        data.orderby  = "idx asc";

      this.post.search( data, fetchedexam =>{
        this.exam_data = fetchedexam.search;
        this.questionCount = JSON.parse(JSON.stringify( fetchedexam.search ) );
        this.getCurrentQuestion();

      }, error =>{})
  }






  randomizeChoices( i ){
    ///changing the structure of choices for randomization without requesting from server.
    let temp                 = []
    let restructured_choices = {}
    let currentquestion      = this.exam_data[ i ]
    console.log('first structure ', currentquestion )
    for( let key in currentquestion ){
      temp.push( currentquestion[ key ] )
    }
    restructured_choices =
      { 'choices' : [
        { 'key': 1, 'value':temp[ 2 ] }, 
        { 'key': 2, 'value':temp[ 3 ] },
        { 'key': 3, 'value':temp[ 4 ] },
        { 'key': 4, 'value':temp[ 5 ] } 
        ]};
        console.log('restrucured choices ', restructured_choices)
    this.current_choices = _.shuffle( restructured_choices[ 'choices' ] )
    console.log( '2nd ', _.shuffle( restructured_choices[ 'choices' ] ) );
  }






  getCurrentQuestion(){
      this.ctrRandom = Math.floor( Math.random() * ( this.exam_data.length - 1 + 1 ) ) + 0;//// randomizing a number within the range of the max quantity of questions
      this.current_question = this.exam_data[ this.ctrRandom ]; ///using the random number as index to get the random current question.      
      this.randomizeChoices(this.ctrRandom);///method that randomize choices.
  }






  onClickNext( radio? ){
    if( this.validate_exam( this.radio ) == false)///validates if the user selected an answer.

    console.log( 'selected ',  radio, ' right answer', this.current_question.varchar_5 )
    if( this.validate_exam( radio ) == false ) return;
    this.validate = '';
    this.ctr+=1;

    if( radio == this.current_question.varchar_5 ){
      this.score+= 1;
      console.log( 'check current score ', this.score )
    }
    this.randomizedQuestions(); 
    this.radio = '';
  }





  validate_exam( val ){
    ///form validation
    if( val == null || val == '' ){ 
      this.validate = 'No answer selected'
      console.log( this.validate );
      return false;
    }
    this.validate = '';
    return true;
  }






  onClickFinish(){
      this.router.navigate( [ 'quiz/final' ] );
      /////passing data to data service.
      this.dataService.playerStats.score           = this.score;
      this.dataService.playerStats.total_questions = this.questionCount.length;
      this.dataService.playerStats.subject         = this.subject_data.post.content;
  }






  randomizedQuestions(){
    if ( this.ctr >= this.questionCount.length ){ ////checks if there is no more questions left.
      console.log( 'end' );
      this.onClickFinish();
    }

    this.exam_data.splice( this.ctrRandom, 1 );///removes the current question from array so it won't repeat.    
    this.ctrRandom = Math.floor( Math.random() * ( this.exam_data.length - 1 + 1 ) );///getting a random number within the range of the max number of quesiton.
    
    this.current_question = this.exam_data[ this.ctrRandom ];/// getting the next random question using the ctrRandom as index
    this.randomizeChoices( this.ctrRandom );///passing ctrRandom for randomizing choices.
  }

}
