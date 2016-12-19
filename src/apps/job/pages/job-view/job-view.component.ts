import { Component } from '@angular/core';
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
  selector: 'app-job-view',
  templateUrl: 'job-view.component.html'
})
export class JobViewComponent {

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
  urlDefault: string = "assets/img/anonymous.gif";
  urlPhoto: string = this.urlDefault;
  files: Array<FILE_UPLOAD_DATA> = <Array<FILE_UPLOAD_DATA>>[];

  constructor(
    private region: PhilippineRegion,
    private post: Post,
    private data: Data,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    let idx = this.route.snapshot.params['idx'];
    if( idx ){ //if idx exist then edit
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

  onClickClose(){
    this.router.navigate( [ '/job' ] );
  }

}