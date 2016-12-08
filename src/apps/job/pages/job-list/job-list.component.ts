import { Component, OnInit } from '@angular/core';
import { Post} from '../../../../api/philgo-api/v2/post';
import { POSTS } from '../../../../api/philgo-api/v2/philgo-api-interface';
import { Router } from '@angular/router';
import { Location as _Location } from '@angular/common';

@Component({
  selector: 'app-job-list',
  templateUrl: 'job-list.component.html',
})
export class JobListComponent implements OnInit {

  posts = [];
  post_id = 'jobs';
  page: number = 0;
  constructor(private post: Post,
              private router: Router,
              private _location: _Location
  ) {
    this.loadPosts();
  }

  ngOnInit() {
  }



  loadPosts( infinite? ) {
    this.post.page( {post_id: this.post_id, page_no: ++this.page}, (posts: POSTS) => {
      console.log('loadposts::success', posts);
      this.displayPosts( posts.posts );
      if ( infinite ) infinite.complete();
      //console.log('point ad title: ', posts.ads[0].subject);
      //console.log('comment user name: ', posts.posts[0].comments[0].member.name);
    }, e => {
      console.log( "loadpost:: failed: " + e );
      if ( infinite ) infinite.complete();
      alert(e);
    });
  }

  displayPosts( data ) {
    console.log('displayPosts:::', data)
    if ( data.length ) {
      for( let post of data ){
        this.posts.push( post);
      }
    }
    console.log( this.posts );
  }

  onClickEdit(idx){
    this.router.navigate(['/job/post', idx]);
  }

  onClickBack(){
    this._location.back();
  }

}
