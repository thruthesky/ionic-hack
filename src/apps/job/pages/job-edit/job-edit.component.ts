import { Component, OnInit, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PhilippineRegion } from  '../../providers/philippine-region'
import { Post, POST_DATA } from '../../../../api/philgo-api/v2/post';
import { Member, MEMBER_LOGIN } from '../../../../api/philgo-api/v2/member';
import { Data, FILE_UPLOAD_RESPONSE, FILE_UPLOAD_DATA, DATA_UPLOAD_OPTIONS } from '../../../../api/philgo-api/v2/data';
import { Router, ActivatedRoute } from '@angular/router';

import * as app from '../../../../etc/app.helper';
import * as _ from 'lodash';

declare var Array;
declare var navigator;
declare var Camera;


@Component({
  selector: 'app-job-edit',
  templateUrl: 'job-edit.component.html'
})
export class JobEditComponent implements OnInit {

  form : POST_DATA = <POST_DATA> {
    gid: '',
    subject: 'Job Post Title',
    content: 'Job Post Content',
    post_id: 'jobs',
    sub_category: '', //sub_category
    text_1: '', //first name
    text_2: '', //middle name
    text_3: '', //last name
    char_1: 'M', //Gender
    varchar_1: '', //address
    varchar_2: 'all', //province
    varchar_3: 'all', //city
    varchar_4: '', //mobile
    varchar_5: '2010-01-25', //birthday
    varchar_6: '', //Personal Content
    int_1: '0', //work experience
    int_2: '', //year
    int_3: '', //month
    int_4: '', //day
    photos: []
  };
  loader: boolean = false;
  errorOnPost = null;
  numbers = Array.from(new Array(20), (x,i) => i+1);
  provinces: Array<string> = [];
  cities = [];
  showCities: boolean = false;
  login: MEMBER_LOGIN = null;
  gid: string = null;

  urlDefault: string = "assets/img/anonymous.gif";
  urlPhoto: string = this.urlDefault;
  files: Array<FILE_UPLOAD_DATA> = <Array<FILE_UPLOAD_DATA>>[];
  showProgress: boolean = false;
  progress: number = 0;
  widthProgress: any;
  inputFileValue: string = null;
  cordova: boolean = app.isCordova();

  constructor(
    private region: PhilippineRegion,
    private post: Post,
    private data: Data,
    private member: Member,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private ngZone: NgZone
  ) {
    region.get_province( re => {
      this.provinces = re;
    }, e => {
      console.log('error location.get_province::', e);
    });

    this.login = member.getLoginData();
    this.form.gid = data.uniqid(); // for file upload of new post
    let idx = this.route.snapshot.params['idx'];
    if( idx ){ //if idx exist then edit
      this.post.debug = true;
      this.post.load(idx, re=> {
        console.log('re data',re.post);
        if(re.post) {
          this.form = re.post;
          re.post.photos.map( e => this.files.push(e) );

          if(re.post.photos.length) {
            this.urlPhoto = re.post.photos[0].url_thumbnail;
          }
        }
      }, e => {
        console.log('error on getting idx', e);
      })
    }
  }

  get cityKeys() {
    return Object.keys( this.cities );
  }

  ngOnInit() {
  }

  onClickProvince() {
    if( this.form.varchar_2 != 'all') {
      this.form.varchar_3 = this.form.varchar_2;
      this.region.get_cities( this.form.varchar_2, re => {
        console.log('cities', re);
        if(re) {
          this.cities = re;
          this.showCities = true;
        }
      }, e => {
        console.log('error location.get_cities::', e);
      });
    }
    else {
      this.form.varchar_3 = 'all';
      this.showCities = false;
    }
  }


  onClickSubmit(){
    console.log("onClickSubmit:: ", this.form);
    this.loader = true;
    this.errorOnPost = null;
    if(this.form['varchar_5']) {
      let str = this.form['varchar_5'].split('-');
      this.form['int_2'] = parseInt(str[0]); //year
      this.form['int_3'] = parseInt(str[1]); //month
      this.form['int_4'] = parseInt(str[2]); //day
    }
    if(this.form.idx) {
      this.updatePost();
    }
    else {
      this.createPost();
    }
  }

  createPost() {
    console.log('createPost:: ', this.form);
    this.post.debug =true;
    this.post.create( this.form, data => {
        console.log("post create success: ", data);
        this.openConfirmation('Success::Your post has been Posted.');
        this.loader = false;
        this.clearInputs();
      },
      error => alert( error ),
      () => {}
    )
  }

  openConfirmation(msg) {
    alert(msg);
  }

  updatePost() {
    console.log('UpdatePost::');
    this.post.update( this.form, data => {
      console.log("post update : ", data);
      this.loader = false;
      this.openConfirmation('Success::Your post has been Updated.');
      this.router.navigate( [ '/job/list' ] );
    }, er => alert( er ));
  }

  clearInputs(){
    this.form = {
      subject: 'Job Post Title',
      content: 'Job Post Content',
      post_id: 'jobs',
      sub_category: '', //sub_category
      text_1: '', //first name
      text_2: '', //middle name
      text_3: '', //last name
      char_1: 'M', //Gender
      varchar_1: '', //address
      varchar_2: 'all', //province
      varchar_3: 'all', //city
      varchar_4: '', //mobile
      varchar_5: '2010-01-25', //birthday
      varchar_6: '', //Personal Content
      int_1: '0', //work experience
      int_2: '', //year
      int_3: '', //month
      int_4: '', //day
      photos: []
    };
    this.urlPhoto = this.urlDefault;
    this.showCities = false;
  }



  // for camera.
  onClickFileUploadButton() {
    if ( ! this.cordova ) return;
    let type = null;
    let re = confirm("Click 'YES' to take photo. Click 'NO' to get photo from library.");
    if ( re ) {
      // get the picture from camera.
      type = Camera.PictureSourceType.CAMERA;
    }
    else {
      // get the picture from library.
      type = Camera.PictureSourceType.PHOTOLIBRARY
    }
    console.log("in cordova, type: ", type);
    let options = {
      quality: 80,
      sourceType: type
    };
    navigator.camera.getPicture( path => {
      console.log('photo: ', path);
      // transfer the photo to the server.
      this.fileTransfer( path );
    }, e => {
      console.error( 'camera error: ', e );
      alert("camera error");
    }, options);
  }


  fileTransfer( fileURL: string ) {
    this.showProgress = true;
    let options: DATA_UPLOAD_OPTIONS = {
      module_name: 'post',
      gid: this.form.gid
    };
    this.data.transfer( options,
      fileURL,
      s => this.onSuccessFileUpload(s),
      f => this.onFailureFileUpload(f),
      c => this.onCompleteFileUpload(c),
      p => this.onProgressFileUpload(p)
    );
  }


  onChangeFile( event ) {
    this.showProgress = true;
    this.data.uploadPostFile( this.form.gid, event,
      s => this.onSuccessFileUpload(s),
      f => this.onFailureFileUpload(f),
      c => this.onCompleteFileUpload(c),
      p => this.onProgressFileUpload(p)
    );
  }

  onSuccessFileUpload (re: FILE_UPLOAD_RESPONSE) {
    console.log('re.data: ', re.data);
    this.deleteFile( this.form.photos[0] );
    this.form.photos =  re.data;
    this.urlPhoto = re.data.url_thumbnail;
    this.showProgress = false;
    this.renderPage();
  }
  onFailureFileUpload ( error ) {
    this.showProgress = false;
    alert( error );
  }
  onCompleteFileUpload( completeCode ) {
    console.log("completeCode: ", completeCode);
  }
  onProgressFileUpload( percentage ) {
    console.log("percentag uploaded: ", percentage);
    this.progress = percentage;
    this.renderPage();
  }

  onClickDeleteFile( file ) {

    let re = confirm("Do you want to delete?");
    if ( re == false ) return;

    this.deleteFile( file );

  }

  deleteFile( file ){
    if( ! file ) return;
    console.log("onClickDeleteFile: ", file);
    let data = {
      idx: file.idx
    };
    this.data.delete( data, (re) => {
      console.log("file deleted: ", re);
      _.remove( this.files, x => {
        console.log('x:', x);
        return x.idx == data.idx;
      } );
      console.log( this.files );
    }, error => {
      alert( error );
    } );
  }

  renderPage() {
    this.ngZone.run(() => {
      console.log('ngZone.run()');
    });
  }

}
