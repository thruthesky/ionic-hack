/**
 * @see ../../../README.md
 * 
 */
import { Component, Input } from '@angular/core';
import { Post, PAGE, PAGE_OPTION, POSTS } from '../../../../api/philgo-api/v2/post';
import { ONE_HOUR_STAMP } from '../../../../etc/share';
@Component({
    selector: 'latest-post-component',
    templateUrl: 'latest-post-component.html'
})
export class LatestPostComponent {
    @Input() title_icon : string = null;
    @Input() title: string = null;
    @Input() post_id: string = null;
    @Input() limit : number = 5;
    @Input() options = {
        right : {
             icon : "",
             title : "",  
             post_id : "",
             limit : 10
         },
         left_top : {
             icon : "",
             title : "", 
             post_id : "", 
            limit : 5
         },
         left_bottom :{
             icon : "",
             title : "",
             post_id : "",
             limit : 5
         }

    };
    posts: POSTS = <POSTS> [];
    latest = {
         right :  <POSTS>[],
         left_top :  <POSTS>[],
         left_bottom :  <POSTS>[]
     };


    constructor( private post: Post ) {
        //console.log("LatestComponent::constructor()");
    }
    ngOnInit() {
        this.loadPosts( this.options.right.post_id,    this.options.right.limit,    this.latest.right);
        this.loadPosts( this.options.left_top.post_id,   this.options.left_top.limit,   this.latest.left_top);
        this.loadPosts( this.options.left_bottom.post_id,   this.options.left_bottom.limit,   this.latest.left_bottom);
    }



    loadPosts(post_id,limit, posts){

         let option: PAGE_OPTION = {
            post_id: post_id,
            limit: limit,
            // expire: ONE_HOUR_STAMP,
            fields: 'idx,idx_parent,subject,deleted,gid,good,no_of_comment,no_of_view,post_id,stamp'
        };


          this.post.page( option, ( page: PAGE ) => {
            console.log("latest: ", page);        
            page.posts.map( ( v, i ) => {
                setTimeout( () => {
                    v.url = this.post.getLink( v );
                    posts.push( v );
                }, i * 50 );
            } );
        },
        error => alert( "Latest error: " + error ),
        () => {});
    }
}


