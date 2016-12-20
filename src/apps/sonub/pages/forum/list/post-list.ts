import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, PAGE, POSTS, POST, PAGE_OPTION } from "../../../../../api/philgo-api/v2/post";
@Component({
    selector: 'sonub-post-list',
    templateUrl: 'post-list.html'
})
export class SonubPostListPage {
    // pages: PAGES = <PAGES> [];
    posts: POSTS = <POSTS> [];
    showPostCreateFrom: boolean = false;
    post_id: string = '';
    page_no: number = 1;
    constructor( private post: Post, activated: ActivatedRoute ) {
        console.log("SonubPostListPage::constructor()");
        // this.post_id = activated.snapshot.params['post_id'];
        activated.params.subscribe( param => {
            this.post_id = param['post_id'];
            this.post_id = this.post_id.replace('--', ',');
            this.page_no = 0;
            this.loadPage();
        } );
    }

    loadPage() {

        let option: PAGE_OPTION = {
            post_id: this.post_id,
            page_no: this.page_no,
            limit: 10
        };
        // this.post.debug = true;
        this.post.page( option, (page: PAGE) => {
            if ( page.page_no == 1 ) {
                this.replacePush( page, option );
                // this.removeFirstPage( option );
            }
            else this.delayPush( page );
        },
        error => alert("Page Load Error: " + error)
        );
    }

    delayPush( page:PAGE ) {
        let posts = page.posts;
        posts.map( ( v, i ) => {
            setTimeout( () => {
                this.posts.push ( this.pre(v) );
            },
            100 + i * 10 );
        });
    }
    /**
     * 이것은 글 하나씩 바꿔치기하므로 blinking 이 발생하지 않는다.
     * 또한 첫 페이지에서 기존 글이 모두 올바로 제거된다.
     * 새로운 글이 있으면 맨 아래의 기존 글은 다음페이지에 보이므로
     * 그냥 해당 갯 수 만큼 바꿔치기 하면 된다.
     * 요점 : 한꺼번에 한 페이지 전체를 바꿔치기 하지 않고, 약간의 시간차로 하나씩 바꿔치기 한다.
     */
    replacePush( page: PAGE, option: PAGE_OPTION ) {
        for( let i = 0; i < option.limit; i ++ ) {
            setTimeout( () => {
                this.posts[i] = page.posts[i];
            }, i * 100);
        }
    }
    /**
     * 이것은 그냥 첫 페이지 게시글을 한번에 없애버리므로 blinking 이 발생한다.
     */
    removeFirstPage( option: PAGE_OPTION ) {
        // console.log("removeFirstPage() : ", option);
        if ( this.posts.length == 0 ) {
            // console.log("No post. just return");
            return;
        }
        // console.log("before: ", this.posts.length);
        this.posts.splice( 0, option.limit );
        // console.log("after: ", this.posts.length);
    }
    pre( post ) : POST {
        post.url = this.post.getPermalink( post );
        return post;
    }
    
    onClickPostCreate( ) {
        this.showPostCreateFrom = true;
    }
    editComponentOnCancel() {
        this.showPostCreateFrom = false;
    }
    
    editComponentOnSuccess() {
        this.showPostCreateFrom = false;
    }

}