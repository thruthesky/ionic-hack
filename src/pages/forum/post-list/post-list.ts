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
    comments = {};
    comments_hidden = {};
    comment_edit_mode: 'edit' | 'reply' = null;
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


    showCommentEditModal( comment: COMMENT, post: POST ) {
        
        let comment_clone = _.cloneDeep( comment );
        if ( comment_clone.content ) {
            comment_clone.content = this.post.strip_tags( comment_clone.content );
        }
        console.log("onClickEditComment()", comment_clone);
        /*
        let modalRef = this.modalService.open( CommentEditComponent );
        let modal = modalRef.componentInstance;
        modal.comment = comment_clone;
        modalRef.result.then(( re: POST_RESPONSE ) => {
            console.log(`Modal closed with:`, re);
            if ( re.code === void 0 ) return; // cancelled by cancel button click.
            console.log('parent post: ', post);
            console.log('comment: ', re.post);

            if ( comment.idx !== void 0 ) { // comment edit.
                comment.content = re.post.content;
            }
            else { // reply under another comment.
                let iParent = _.findIndex( post.comments, comment => {
                    return comment.idx == re.post.idx_parent;
                });
                post.comments.splice( iParent + 1, 0, <COMMENT>re.post);
            }
        }, (reason) => {
            console.log( `Modal dismissed.`);
        });
        */
        
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
        this.comment_edit_mode = 'edit';
        this.comments = {};
        this.comments[ comment.idx.toString() ] = true;
    }

    
    onClickCommentReply( comment ) {
        this.comment_edit_mode = 'reply';
        this.comments = {};
        this.comments[ comment.idx.toString() ] = true;
    }


    onClickCommentDelete( comment ) {
        
    }
    onClickCommentLike( comment ) {
        
    }
    onClickCommentDislike( comment ) {
        
    }
    onClickCommentReport( comment ) {
        
    }
}