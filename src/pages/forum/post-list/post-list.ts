import { Component, Renderer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppRouter, ActivatedRoute } from '../../../app/app.router';
import { Post, POSTS, PAGE_DATA } from '../../../api/philgo-api/v2/post';
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
        // console.log("scrolled:", this.scrollCount++);
        let pages = document.querySelector(".pages");
        if ( pages === void 0 || ! pages || pages['offsetTop'] === void 0) return; // @attention this is error handling for some reason, especially on first loading of each forum, it creates "'offsetTop' of undefined" error.
        let pagesHeight = pages['offsetTop'] + pages['clientHeight'];
        let pageOffset = window.pageYOffset + window.innerHeight;
        if( pageOffset > pagesHeight - 200) { // page scrolled. the distance to the bottom is within 200 px from 
            // console.log("page scroll reaches at bottom: pageOffset=" + pageOffset + ", pagesHeight=" + pagesHeight);
            this.loadPage();
        }
    }
    ngOnDestroy() {
        this.endScroll();
    }
    loadPage() {
        if ( this.inPageLoading ) {
            // console.info("in paeg loading");
            return;
        }
        this.inPageLoading = true;
        // console.log("page no: ", this.page);
        let data: PAGE_DATA = {
            post_id: this.post_id, page_no: this.page ++, limit: 6,
            fields: 'idx,idx_parent,subject,content,deleted,gid,good,no_of_comment,no_of_view,post_id,stamp'
        };
        // this.post.debug = true;
        this.post.page( data, (page) => {
            // console.log('PostList::loadPage() page:', page);
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
    /**
     * To reduce rendering load.
     */
    lazyProcess( page: POSTS ) {
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
    getLink( post ) {
        let full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
        full += '/-/' + post.idx;
        return full;
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

    onClickDelete( post ) {
        post.inDeleting = true;
        this.post.delete( post.idx, re => {
            console.log('delete: re: ', re);
            post['subject'] = "deleted";
            post['content'] = "deleted";
            },
            error => alert("delete error: " + error ),
            () => post.inDeleting = false
        );
    }
    
    onClickReport( post ) {
        //console.log("onClickReport()");
        //this.post.debug = true;
        post.inReport = true;
        this.post.report( post.idx, re => {
            // console.log('delete: re: ', re);
            alert("You have reported a post. Thank you.");
        },
        error => alert("report error: " + error ),
        () => {
            post.inReport = false;
        });
    }


    onClickLike( post ) {
        post.inLike = true;
        this.post.vote( post.idx, re => {
            console.log('delete: re: ', re);
            // alert("You have reported a post. Thank you.");
            post.good ++;
        },
        error => {
            alert("like error: " + error );
        },
        () => {
            post.inLike = false;
        });
    }
    
    
    onError( event ) {
        alert("error: " + event );
    }
    onSuccess() {
        this.closeAllOpenForms();
    }
    onCancel() {
        this.closeAllOpenForms();
    }

    closeAllOpenForms() {
        this.hideContent = {};
        this.showEditComponent = {};
        this.showPostCreateForm = false;
    }
    
    
}