import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post, POST_DATA, SEARCH_QUERY_DATA, POST, POST_RESPONSE } from '../../../../api/philgo-api/v2/post';
import { DataService } from '../../services/data-service/data.service';

interface form {
  idx       : number;
  subject  ?: string;
  isActive : boolean;
  duration  : number;
}

@Component({
  selector: 'app-subjectform',
  templateUrl: './subjectform.component.html',
  inputs: [ 'subject', 'subject_list' ]
})
export class SubjectformComponent implements OnInit {
  subject_list = [];
  subject = <POST_DATA>{}
  subject_idx;
  subject_form = <form>{
    isActive: false
  }
  category_data = [];

  submit = new EventEmitter();
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
  constructor(
    private post        : Post,
    private dataService : DataService
  ) { 

  }




  successCallback( re: POST_RESPONSE ) {
      // console.log( 'PhilGo API Query success: ', re);

      if ( this.mode == "create-post" ) {
          try {
              if ( ! this.dataService.subject_data.idx ) {
                  console.log("posts: ", this.posts);
                  console.log("re: ", re);
                  this.posts.push( re.post );
              }else{
                console.log('index', this.dataService.subject_index )
                this.posts.splice( this.dataService.subject_index, 1, re.post )
              }
          }
          catch ( e ) { alert("Please restart the app." + e ); }
      }
      this.active = false; // remove '.show' css class.  it cannot be inside this.clear()
      this.temp = {};
      this.success.emit();
      this.dataService.subject_data = {};
      this.subject_form = <form>{};
      this.subject_idx = null;
  }

  errorCallback( error ) {
      alert( error );
  }
  completeCallback() {
      this.inPosting = false;

  }




  onClickCancel() {
      this.active = false;
      this.subject_form = <form>{};
      this.subject_idx = null;
      this.dataService.subject_data = <POST_DATA>{};
      this.cancel.emit();
  }


  ngOnInit() {
    this.getCategory();
    this.initialize_data();///initializing data for editing
    if( this.dataService.subject_data.idx ){
      this.subject_idx =  this.dataService.subject_data.idx      
    }
  }



  initialize_data(){
    if( this.dataService.subject_data.idx ){
      this.subject_form.idx = this.dataService.subject_data.idx;
      this.subject_form.isActive = this.dataService.check_status( this.dataService.subject_data.varchar_1 );
      this.subject_form.duration = this.dataService.subject_data.varchar_3;
      this.subject_form.subject = this.dataService.subject_data.content;
    }
  }








  onClickSubmit(){

    let subject           = <POST_DATA>{};
        subject.id        = "subject";
        subject.gid       = "default";
        subject.post_id   = "job";
        subject.category  = "OES";
        subject.subject   = "subject";
        subject.content   = this.subject_form.subject;
        subject.varchar_1 = this.subject_form.isActive.toString();
        subject.varchar_3 = this.subject_form.duration;

    if( this.dataService.subject_data.idx ) {
        subject.idx       = this.dataService.subject_data.idx;
      this.post.update( subject ,            
            s => this.successCallback( s ),
            e => this.errorCallback( e ),
            () => this.completeCallback())
            return;
    }

      this.post.create( subject,            
            s => this.successCallback( s ),
            e => this.errorCallback( e ),
            () => this.completeCallback())
  }









  getCategory(){
    console.log( "LIST Fired" );
    
    let data = <SEARCH_QUERY_DATA>{};
        data.fields  = 'idx, content, subject, category, varchar_1';
        data.from    = "sf_post_data";
        data.where   = "post_id='job' AND category='OES' AND subject='category' AND varchar_1='true'";
        data.orderby = "idx asc";
      this.post.search( data, categoryData =>{
        this.category_data = categoryData.search;
        console.log('success', this.category_data);

      }, error => alert( "something went wrong" + error ) )
  }




}
