import { Component } from '@angular/core';
import { AppRouter, ActivatedRoute } from '../../../app/app.router';
import { Post, POSTS } from '../../../api/philgo-api/v2/post';
@Component({
    selector: 'post-list-page',
    templateUrl: 'post-list.html'
})
export class PostListPage {


    post_id: string = null;
    data;

    constructor( private post: Post, private router: AppRouter, private activatedRoute: ActivatedRoute ) {

        this. post_id = activatedRoute.snapshot.params['post_id'];
        // console.log( 'post_id: ' + this.post_id );
        this.post.page( {post_id: this.post_id, page_no: 1}, (posts: POSTS) => {
            console.log('posts:', posts);
            this.data = posts;
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




}