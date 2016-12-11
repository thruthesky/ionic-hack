import { Component } from '@angular/core';
import { AppRouter, ActivatedRoute } from '../../../app/app.router';
import { Post, POSTS, POST_RESPONSE, POST_DATA, POST, COMMENT } from '../../../api/philgo-api/v2/post';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { CommentEditComponent } from './comment-edit-modal-component';

@Component({
    selector: 'post-list-page',
    templateUrl: 'post-list.html'
})
export class PostListPage {


    post_id: string = null;
    page: number = 1;
    pages: Array<POSTS> = [];
    comments = {};
    comment_reply_form_active = {};
    constructor(
        private post: Post,
        private router: AppRouter,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal ) {

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


    onClickCommentCreate( post ) {
        console.log("comments: ", this.comments);
        let idx = post.idx.toString();
        let data: POST_DATA = {
            idx_parent: idx,
            content: this.comments[ idx ]
        };
        this.post.createComment( data, (re:POST_RESPONSE) => {
            console.log( 'create comment success: ', re);
            if ( post.comments ) post.comments.unshift( <COMMENT> re.post ); // if there are other comments,
            else post['comments'] = [ <COMMENT> re.post ]; // if there is no comments.
            this.comments = {};
            if ( this.comment_reply_form_active[ idx ] ) delete this.comment_reply_form_active[ idx ];
        }, error => {
            alert('error:' + error);
        }, () => {
            //
        });
    }

    onClickCommentEdit( comment, post ) {
        this.showCommentEditModal( comment, post );
    }

    
    onClickCommentReply( comment, post ) {
        comment = {
            idx_parent: comment.idx
        };
        this.showCommentEditModal( comment, post );
    }

    showCommentEditModal( comment: COMMENT, post: POST ) {
        
        let comment_clone = _.cloneDeep( comment );
        if ( comment_clone.content ) {
            comment_clone.content = this.post.strip_tags( comment_clone.content );
        }
        console.log("onClickEditComment()", comment_clone);
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
        
    }
    onScrollDown () {
        console.log('scrolled down!!');
        this.loadPage();
    }

    onScrollUp () {
        console.log('scrolled up!!')
    }

    onClickCommentFileUploadButton() {
        //
    }
    onChangeCommentFile() {
        //

    }
}