import { Component } from '@angular/core';
import { ForumService } from '../../providers/forum';
@Component({
    selector: 'sonub-home-page',
    templateUrl: 'home.html'
})
export class SonubHomePage {
    forums;
    forum_group;
    constructor(
        forum: ForumService
    ) {
        this.forums = forum.forums;
        this.forum_group = Object.keys( this.forums );
        // console.log( this.forums);


        

    }
}