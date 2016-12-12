import { Component, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppRouter, ActivatedRoute } from '../../../app/app.router';
import { Post, POSTS, POST_RESPONSE, POST_DATA, POST, COMMENT } from '../../../api/philgo-api/v2/post';
import { Data, FILE_UPLOAD_RESPONSE, FILE_UPLOAD_DATA } from '../../../api/philgo-api/v2/data';

//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
    selector: 'post-list-page',
    templateUrl: 'post-list.html'
})
export class PostListPage {
    showEditComponent = {};
    comments_hidden = {};
    mode: 'create-post' | 'edit-post' | 'create-comment' | 'edit-comment' = null;
    post_id: string = null;
    page: number = 1;
    pages: Array<POSTS> = [];
    files: Array<FILE_UPLOAD_DATA> = <Array<FILE_UPLOAD_DATA>>[];
    constructor(
        private ngZone: NgZone,
        private post: Post,
        private data: Data,
        private router: AppRouter,
        private sanitizer: DomSanitizer,
        // private modalService: NgbModal,
        private activatedRoute: ActivatedRoute
        ) {
        this.post_id = activatedRoute.snapshot.params['post_id'];
        if ( this.post_id ) {
            this.loadPage();
        }
        else {
            alert("No post id provided");
        }
    }
    loadPage() {
        console.log("page no: ", this.page);
        this.post.page( {post_id: this.post_id, page_no: this.page ++, limit: 6}, (page: POSTS) => {
            console.log('page:', page);
            if ( page.page_no == 1 ) this.pages[0] = page;
            else this.pages.push( page );
            //console.log('point ad title: ', posts.ads[0].subject);
            //console.log('comment user name: ', posts.posts[0].comments[0].member.name);
        }, e => {
            alert(e);
        });
    }


    onClickPostCreate() {
        this.router.go("/post/create/" + this.post_id);
    }

    onClickPostEdit( post_idx ) {
        console.log("post edit: ", post_idx);
        this.router.go("/post/edit/" + post_idx );
    }

    onScrollDown () {
        console.log('scrolled down!!');
        this.loadPage();
    }

    onScrollUp () {
        console.log('scrolled up!!')
    }


    /**
     * 
     * @note it only opens a form at a time.
     */
    onClickCommentEdit( comment ) {
        this.mode = 'edit-comment';
        this.showEditComponent = {};
        this.showEditComponent[ comment.idx.toString() ] = true;
    }

    onClickCommentReply( comment ) {
        this.mode = 'edit-comment';
        this.showEditComponent = {};
        this.showEditComponent[ comment.idx.toString() ] = true;
    }

    onClickCommentDelete( comment ) {
        
    }
    onClickCommentLike( comment ) {
        
    }
    onClickCommentDislike( comment ) {
        
    }
    onClickCommentReport( comment ) {
        
    }

    onEditPostLoad() {

    }

    onError( event ) {
        alert("error: " + event );
    }
    onSuccess() {
        this.showEditComponent = {};
    }
}