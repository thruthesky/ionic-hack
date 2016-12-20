


# How to show Forum List

````



<div *ngFor = " let group of forum_group ">
{{ group }}


<div *ngFor = " let forum of forums[group] ">
    {{ forum | json }}
    <div routerLink="/forum/{{forum}}">{{ forum }}</div>
</div>


</div>

````


````
import { Component } from '@angular/core';
import { ForumService } from '../../providers/forum';

@Component({
    selector: 'sonub-left',
    templateUrl: 'left.html'
})
export class SonubLeft {
    forums;
    forum_group;
    constructor(
        forum: ForumService
    ) {
        this.forums = forum.forums;
        this.forum_group = Object.keys( this.forums );
        console.log( this.forums);
    }
}
````