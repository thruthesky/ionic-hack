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
    constructor( private post: Post, activated: ActivatedRoute ) {
        let post_id = activated.snapshot.params['post_id'];
        post.page( { post_id: post_id }, (page: PAGE) => {
            this.delayPush( page.posts );
        },
        error => alert(error)
        );
    }

    delayPush( arr ) {
        arr.map( ( v, i ) => {
            let s = 100;
            if ( i > 10 ) s = 1000;
            else if ( i > 6 ) s = 500;
            setTimeout( () => {
                this.posts.push ( this.pre(v) );
            },
            i * s );
        });
    }
    pre( post ) : POST {
        post.url = "url";
        return post;
    }
}