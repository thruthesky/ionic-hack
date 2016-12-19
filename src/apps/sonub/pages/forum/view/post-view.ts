import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'sonub-post-view',
    templateUrl: 'post-view.html'
})
export class SonubPostViewPage {
    idx_post: number = 0;
    constructor( activated: ActivatedRoute ) {
        activated.params.subscribe( param => this.idx_post = param['idx_post'] );
    }
}