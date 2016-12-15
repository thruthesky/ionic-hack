import { Component } from '@angular/core';
import { Post, PAGE, PAGES } from "../../../../../api/philgo-api/v2/post";
@Component({
    selector: 'sonub-post-list',
    templateUrl: 'post-list.html'
})
export class SonubPostListPage {
    pages: PAGES = <PAGES> [];
    constructor( private post: Post ) {
        post.page( { post_id: 'qna' }, (page: PAGE) => {
            console.log(page);
            this.pages.push( page );
        },
        error => alert(error)
        );
    }
}