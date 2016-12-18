import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, PAGE, POSTS, POST } from "../../../../../api/philgo-api/v2/post";
@Component({
    selector: 'sonub-post-list',
    templateUrl: 'post-list.html'
})
export class SonubPostListPage {
    // pages: PAGES = <PAGES> [];
    posts: POSTS = <POSTS> [];
    showPostCreateFrom: boolean = false;
    constructor( private post: Post, activated: ActivatedRoute ) {
        let post_id = activated.snapshot.params['post_id'];


        post.page( { post_id: post_id, limit: 3 }, (page: PAGE) => {
            if ( page.page_no == 1 ) this.posts = [];
            this.delayPush( page.posts );
        },
        error => alert(error)
        );
    }

    delayPush( arr ) {
        arr.map( ( v, i ) => {
            setTimeout( () => {
                this.posts.push ( this.pre(v) );
            },
            100 + i * 10 );
        });
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
}