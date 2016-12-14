import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, POST_DATA, POST_RESPONSE } from '../../../api/philgo-api/v2/post';
import * as app from '../../../etc/app.helper';
@Component({
    selector: 'post-view-page',
    templateUrl: 'post-view.html'
})
export class PostViewPage {
    cordova: boolean = app.isCordova();
    post: POST_DATA = <POST_DATA> {};
    idx_post: number = 0;
    constructor( private activated: ActivatedRoute, post: Post ) {
        this.idx_post = this.activated.snapshot.params['idx_post'];
        post.load( this.idx_post, (re: POST_RESPONSE) => {
                this.post = re.post;
                },
                e => alert("error: " + e),
                () => {}
            );
    }
    ngOnInit() {
        
    }

}