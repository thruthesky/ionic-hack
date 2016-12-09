import { Component } from '@angular/core';
import { AppRouter, ActivatedRoute } from '../../../app/app.router';
import { Post, POSTS, POST_RESPONSE, POST_DATA, COMMENT } from '../../../api/philgo-api/v2/post';
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
    constructor(
        private post: Post,
        private router: AppRouter,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal ) {


        /* test on comment edit.
        let c = {"idx":"1272584620","member":{"id":"second","name":"second","nickname":"second","idx_primary_photo":"1483471"},"idx_root":"1272582904","idx_parent":"1272582904","gid":"","post_id":"greeting","photos":[],"content":"I am fine. and you?","user_name":"second","stamp":"1481214157","idx_member":"9182","deleted":"0","blind":"","good":"0","bad":"0","depth":"1","int_10":"0"};
        this.onClickEditComment( c );
        */
/*
        setInterval( () => {
            let c = {"idx_parent":"1162","content":"new title:" + (new Date()).getTime(),"action":"comment_write_submit","id":"user534","session_id":"39ba82cf2df41499e3bbd16dd8b61a27","module":"ajax","submit":1};
            this.post.createComment(
                c,
                re => {
                    console.log('auto comment create success: ', re);
                    let page = _.find( this.pages, page => {
                        _.find( page.posts, post => {
                            if ( post.idx == re.post.idx_root ) {
                                if ( post.comments ) {
                                    let iParent = _.findIndex( post.comments, comment => {
                                        return comment.idx == re.post.idx_parent;
                                    });
                                    post.comments.splice( iParent + 1, 0, <COMMENT>re.post);
                                }
                            };
                        });
                    } );
                },
                e => alert(e),
                () => console.log('auto comment create complete:')
            );
        }, 3000);
        */

        this.post_id = activatedRoute.snapshot.params['post_id'];
        if ( this.post_id ) {
            this.loadPage();
        }
        else {
            alert("No post id provided");
        }
    }
    loadPage() {
        // console.log( 'post_id: ' + this.post_id );
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


    onEnterComment( post_idx ) {
        console.log("comments: ", this.comments);
        let idx = post_idx.toString();
        let data: POST_DATA = {
            idx_parent: idx,
            content: this.comments[ idx ]
        };
        this.post.createComment( data, (re:POST_RESPONSE) => {
            console.log( 'create comment success: ', re);
            
            let page = _.find( this.pages, page => {
                        _.find( page.posts, post => {
                            if ( post.idx == re.post.idx_root ) {
                                if ( post.comments ) {
                                    let iParent = _.findIndex( post.comments, comment => {
                                        return comment.idx == re.post.idx_parent;
                                    });

                                    post.comments.splice( iParent + 1, 0, <COMMENT>re.post);
                                }
                            };
                        });
                    } );

                    this.comments = {};


        }, error => {
            alert('error:' + error);
        }, () => {

        });
    }

    onClickEditComment( comment ) {
        this.showCommentEditModal( comment );
    }

    
    onClickReplyComment( comment ) {
        comment = {
            idx_parent: comment.idx
        };
        this.showCommentEditModal( comment );
    }

    showCommentEditModal( comment ) {
        
        console.log("onClickEditComment()", comment);
        let modalRef = this.modalService.open( CommentEditComponent );
        let modal = modalRef.componentInstance;
        modal.comment = comment;
        modalRef.result.then(( re: POST_RESPONSE ) => {
            console.log(`Modal closed with:`, re);
            
            let page = _.find( this.pages, page => {
                        _.find( page.posts, post => {
                            if ( post.idx == re.post.idx_root ) {
                                if ( post.comments ) {
                                    let iParent = _.findIndex( post.comments, comment => {
                                        return comment.idx == re.post.idx_parent;
                                    });
                                    post.comments.splice( iParent + 1, 0, <COMMENT>re.post);
                                }
                            };
                        });
                    } );

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

}