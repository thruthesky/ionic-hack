import { Component, OnInit } from '@angular/core';
import { Post} from '../../../../api/philgo-api/v2/post';
import { POSTS } from '../../../../api/philgo-api/v2/philgo-api-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: 'job-list.component.html',
})
export class JobListComponent implements OnInit {

  posts = [];
  post_id = 'jobs';
  page: number = 1;
  pages: Array<POSTS> = [];
  constructor(private post: Post,
              private router: Router,
  ) {
    this.loadPage();
  }

  ngOnInit() {
  }

  loadPage() {
    this.post.page( {post_id: this.post_id, page_no: this.page++, limit: 5}, (page: POSTS) => {
      console.log('loadpage::success', page);
      if(page.posts.length){
        if ( page.page_no == 1 ) this.pages[0] = page;
        else this.pages.push( page );
      }
      else {
        console.log('No More Post');
        this.page--;
      }
      console.log('loadpage::success', this.pages);
    }, e => {
      console.log( "loadpost:: failed: " + e );
      alert(e);
    });
  }
/*
  displayPosts( data ) {
    console.log('displayPosts:::', data)
    if ( data.length ) {
      for( let post of data ){
        this.posts.push( post);
      }
    }
    console.log( this.posts );
  }
*/
  onClickEdit(idx){
    this.router.navigate(['/job/post', idx]);
  }

  onScrollDown () {
    console.log('scrolled down!!');
    this.loadPage();
  }


}
