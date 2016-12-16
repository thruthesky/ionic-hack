import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, PAGE, PAGES } from "../../../../../api/philgo-api/v2/post";
@Component({
    selector: 'sonub-post-list',
    templateUrl: 'post-list.html'
})
export class SonubPostListPage {
    pages: PAGES = <PAGES> [];
    constructor( private post: Post, activated: ActivatedRoute ) {
        let post_id = activated.snapshot.params['post_id'];
        post.page( { post_id: post_id }, (page: PAGE) => {
            console.log(page);
            this.pages.push( page );
        },
        error => alert(error)
        );
    }
}