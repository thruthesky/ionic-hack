import { Component,Renderer } from '@angular/core';
import { Post} from '../../../../api/philgo-api/v2/post';
import { PAGE, PAGES } from '../../../../api/philgo-api/v2/philgo-api-interface';
import { Member, MEMBER_LOGIN } from '../../../../api/philgo-api/v2/member';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-job-list',
  templateUrl: 'job-list.component.html',
})
export class JobListComponent {

  login: MEMBER_LOGIN = {
    id:''
  };
  shareUrl = 'http://192.168.26.2:8000/job/view/';
  today = new Date();
  currentYear = this.today.getFullYear();
  moreButton = [];
  posts = [];
  post_id = 'jobs';
  page: number = 1;
  pages: PAGES = [];

  scrollListener = null;
  scrollCount = 0;
  inPageLoading: boolean = false; // true while loading a page of posts.

  noMorePosts: boolean = false; // true when there are no more posts of a page.

  constructor(private post: Post,
              private router: Router,
              private renderer: Renderer,
              private member: Member
  ) {
    member.getLogin( x => {
      this.login = x;
    });
    this.loadPage();
    this.beginScroll();
  }


  beginScroll() {
    this.scrollListener = this.renderer.listenGlobal( 'document', 'scroll', _.debounce( () => this.pageScrolled(), 50));
  }
  endScroll() {
    this.scrollListener();
  }
  pageScrolled() {
    console.log("scrolled:", this.scrollCount++);
    let pages = document.querySelector(".pages");
    if ( pages === void 0 || ! pages || pages['offsetTop'] === void 0) return; // @attention this is error handling for some reason, especially on first loading of each forum, it creates "'offsetTop' of undefined" error.
    let pagesHeight = pages['offsetTop'] + pages['clientHeight'];
    let pageOffset = window.pageYOffset + window.innerHeight;
    if( pageOffset > pagesHeight - 200) { // page scrolled. the distance to the bottom is within 200 px from
      console.log("page scroll reaches at bottom: pageOffset=" + pageOffset + ", pagesHeight=" + pagesHeight);
      this.loadPage();
    }
  }
  ngOnDestroy() {
    this.endScroll();
  }


  loadPage() {
    if ( this.inPageLoading ) {
      console.info("in page loading");
      return;
    }
    this.inPageLoading = true;
    this.post.debug = true;
    console.log("page no: ", this.page);
    this.post.page( {post_id: this.post_id, page_no: this.page++, limit: 5}, (page: PAGE) => {
      console.log('PostList::loadPage() page:', page);
      this.inPageLoading = false;
      if ( page.posts.length == 0 ) {
        this.noMorePosts = true;
        this.endScroll();
      }
      if ( page.page_no == 1 ) this.pages[0] = page;
      else this.pages.push( page );
      setTimeout( () => this.lazyProcess( page ), 100 );
    }, e => {
      this.inPageLoading = false;
      if ( e == 'http-request-error maybe no-internet or wrong-domain or timeout or server-down' ) {
        alert("You have no internet.");
      }
      else alert(e);
    });
  }

  getDate( stamp ) {
    let m = parseInt(stamp) * 1000;
    let d = new Date( m );

    let post_year = d.getFullYear();
    let post_month = d.getMonth();
    let post_date = d.getDate();

    let t = new Date();
    let today_year = t.getFullYear();
    let today_month = t.getMonth();
    let today_date = t.getDate();


    let time;
    if ( today_year == post_year && today_month == post_month && today_date == post_date ) {
      time = d.getHours() + ':' + d.getMinutes();
    }
    else {
      time = post_year + '-' + post_month + '-' + post_date;
    }
    return time;
  }

  getLink( post ) {
    let full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    full += '/-/' + post.idx;
    return full;
  }

  /**
   * To reduce rendering load.
   */
  lazyProcess( page: PAGE ) {
    if ( page.posts.length == 0 ) {
      return;
    }

    // for date.
    page.posts.map( post => {
      post['date'] = this.getDate( post.stamp );
      if ( post.comments === void 0 ) return;
      post.comments.map( comment => comment['date'] = this.getDate( comment.stamp ) );
    });

    // for link
    page.posts.map( post => post['link'] = this.getLink( post ) );

  }

/*
  onClickEdit(idx){
    this.router.navigate(['/job/post', idx]);
  }


  onClickDelete( post ) {
    let re = confirm("Are you sure you want to delete this post?");
    if ( re ) {
      this.post.delete( post.idx, re => {
            //console.log('delete: re: ', re);
          },
          error => alert("delete error: " + error )
      );
    }
    else {
      //console.log('delete Was Canceled');
    }
  }
*/

}
