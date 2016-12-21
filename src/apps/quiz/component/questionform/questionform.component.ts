import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post, POST_DATA, POST, POST_RESPONSE } from '../../../../api/philgo-api/v2/post';
import { DataService } from '../../services/data-service/data.service';

interface form{
  question  : string;
  choice1   : string;
  choice2   : string;
  choice3   : string;
  choice4   : string;
  answer    : string;
}

@Component({
  selector: 'app-questionform',
  templateUrl: './questionform.component.html',
  inputs:['question', 'questions_list']
})
export class QuestionformComponent implements OnInit {
  questions_list =[];
  question = <POST_DATA>{};
  content;
  subjectidx:''
  questionForm: form = <form>{};
  exam_idx:number;
  activeCheck:boolean = true;
  subject_idx;

  categoryInfo: POST_DATA = <POST_DATA>[];
  switch:boolean = false;
  subjectInfo: POST_DATA = <POST_DATA>[];

  temp = <POST_DATA> {};
  inDeleting: boolean = false;
  inPosting: boolean = false;

    @Input() post_id: string = null;
    @Input() current: POST;
    @Input() active: boolean = false; // adding '.show' CSS Class to FORM
    @Input() mode: 'create-post';
    @Output() postLoad = new EventEmitter();
    @Output() error = new EventEmitter();
    @Output() success = new EventEmitter();
    @Output() cancel = new EventEmitter();
    @Input() root: POST = null;
    @Input() posts: any = null;

  submit = new EventEmitter();
  constructor(
    private post: Post,
    private dataService: DataService
  ) { 
    this.subject_idx = this.dataService.subjectIDX.idx;
  }

  ngOnInit() {
    this.initialize_data();
  }

  onClickCancel() {
      this.active = false;
      this.questionForm = <form>{};
      this.dataService.question_data = <POST_DATA>{};
      this.cancel.emit();
  }

  successCallback( re: POST_RESPONSE ) {
      // console.log( 'PhilGo API Query success: ', re);

      if ( this.mode == "create-post" ) {
          try {
              if ( ! this.dataService.question_data.idx ) {
                  console.log("posts: ", this.posts);
                  console.log("re: ", re);
                  this.posts.push( re.post );
              }else{
                console.log('index', this.dataService.question_index )
                this.posts.splice( this.dataService.question_index, 1, re.post )
              }
          }
          catch ( e ) { alert("Please restart the app." + e ); }
      }
      this.active = false; // remove '.show' css class.  it cannot be inside this.clear()
      this.temp = {};
      this.success.emit();
      // this.dataService.subject_data = {};
      // this.subject_form = <form>{};
      // this.subject_idx = null;
  }

  errorCallback( error ) {
      console.log('error' + error );
  }
  completeCallback() {
      this.inPosting = false;

  }

  initialize_data(){
    if( this.dataService.question_data.idx ){
      this.questionForm.question = this.dataService.question_data.content;
      this.questionForm.choice1  = this.dataService.question_data.varchar_1;
      this.questionForm.choice2  = this.dataService.question_data.varchar_2;
      this.questionForm.choice3  = this.dataService.question_data.varchar_3;
      this.questionForm.choice4  = this.dataService.question_data.varchar_4;
      this.questionForm.answer   = this.dataService.question_data.varchar_5;
      this.subject_idx = this.dataService.question_data.varchar_6;
    }
  }



  onClickSubmit(){
    console.log('save question');
    let question_data           = <POST_DATA>{};
        question_data.id        = 'questionaires';
        question_data.gid       = 'default';
        question_data.post_id   = 'job';
        question_data.category  = 'OES';
        question_data.subject   = 'exam';
        question_data.content   = this.questionForm.question;
        question_data.varchar_1 = this.questionForm.choice1;
        question_data.varchar_2 = this.questionForm.choice2;
        question_data.varchar_3 = this.questionForm.choice3;
        question_data.varchar_4 = this.questionForm.choice4;
        question_data.varchar_5 = this.questionForm.answer;
        question_data.varchar_6 = this.subject_idx;
        console.log('idx' + this.subject_idx)
    if( this.dataService.question_data.idx ){
      
      this.update( question_data )
      return;
    }

        
      this.post.create( question_data ,            
            s => this.successCallback( s ),
            e => this.errorCallback( e ),
            () => this.completeCallback())


  }




  update( question_data ){
      question_data.idx = this.dataService.question_data.idx;
      
      this.post.update( question_data ,            
            s => this.successCallback( s ),
            e => this.errorCallback( e ),
            () => this.completeCallback())
  }



}
