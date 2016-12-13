import { Component, Renderer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppRouter, ActivatedRoute } from '../../../app/app.router';
import { Post, POSTS } from '../../../api/philgo-api/v2/post';
import { Data, FILE_UPLOAD_DATA } from '../../../api/philgo-api/v2/data';



//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 import * as _ from 'lodash';

@Component({
    selector: 'post-list-page',
    templateUrl: 'post-list.html'
})
export class PostListPage {
    title: string = null;
    //@ViewChild('postListContent') postListContent;
    showPostCreateForm: boolean = false;
    hideContent = {};
    showEditComponent  = {};
    
    mode: 'create-post' | 'edit-post' | 'create-comment' | 'edit-comment' = null;
    post_id: string = null;
    page: number = 1;
    pages: Array<POSTS> = [];
    files: Array<FILE_UPLOAD_DATA> = <Array<FILE_UPLOAD_DATA>>[];
    scrollListener = null;
    scrollCount = 0;
    inPageLoading: boolean = false; // true while loading a page of posts.
    noMorePosts: boolean = false; // true when there are no more posts of a page.
    constructor(
        // private ngZone: NgZone,
        private post: Post,
        private data: Data,
        private router: AppRouter,
        private sanitizer: DomSanitizer,
        // private modalService: NgbModal,
        private activatedRoute: ActivatedRoute,
        private renderer: Renderer
        ) {
        this.post_id = activatedRoute.snapshot.params['post_id'];
        this.title = this.post_id;
        if ( this.post_id ) {
            this.loadPage();
        }
        else {
            alert("No post id provided");
        }
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
        if ( this.inPageLoading ) return;
        this.inPageLoading = true;
        console.log("page no: ", this.page);
        this.post.page( {post_id: this.post_id, page_no: this.page ++, limit: 6}, (page: POSTS) => {
            console.log('page:', page);
            this.inPageLoading = false;
            if ( page.posts.length == 0 ) {
                this.noMorePosts = true;
                this.endScroll();
            }
            if ( page.page_no == 1 ) this.pages[0] = page;
            else this.pages.push( page );

        }, e => {
            this.inPageLoading = false;
            alert(e);
        });
    }

    ngOnInit() {
        
    }

    onClickPostCreate() {
        // this.router.go("/post/create/" + this.post_id);
        this.showPostCreateForm = true;
        // this.postListContent.nativeElement.scrollTo( 0, 0 );
        window.scrollTo( 0, 0 );
    }

    onClickPostEdit( post ) {
        // console.log("post edit: ", post_idx);
        // this.router.go("/post/edit/" + post_idx );
        this.mode = 'edit-post';
        this.hideContent = {};
        this.hideContent[ post.idx.toString() ] = true;
        
        this.showEditComponent = {};
        this.showEditComponent[ post.idx.toString() ] = true;
        
    }


    /**
     * 
     * @note it only opens a form at a time.
     */
    onClickCommentEdit( comment ) {
        this.mode = 'edit-comment';
        this.hideContent = {};
        this.hideContent[ comment.idx.toString() ] = true;
        
        this.showEditComponent = {};
        this.showEditComponent[ comment.idx.toString() ] = true;
        
    }

    onClickCommentReply( comment ) {
        this.mode = 'create-comment';
        this.hideContent = {};
        this.showEditComponent = {};
        this.showEditComponent[ comment.idx.toString() ] = true;
        console.log(this.showEditComponent);
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
        this.hideContent = {};
        this.showEditComponent = {};
        // this.renderPage();
    }
    onCancel() {
        this.hideContent = {};
        this.showEditComponent = {};
    }
    
    
}