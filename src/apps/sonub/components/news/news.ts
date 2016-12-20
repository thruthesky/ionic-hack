/**
 * @see ../../../README.md
 *
 */
import { Component, Input } from '@angular/core';
import { Post, PAGE, PAGE_OPTION, POSTS } from '../../../../api/philgo-api/v2/post';
import { ONE_HOUR_STAMP } from '../../../../etc/share';
import * as _ from 'lodash';


@Component({
  selector: 'sonub-news',
  templateUrl: 'news.html'
})
export class SonubNews {
  @Input() title: string = null;
  @Input() post_id: string = null;
  @Input() limit: number = 1;
  posts: POSTS = <POSTS> [];
  constructor( private post: Post ) {
    //console.log("LatestComponent::constructor()");
  }
  ngOnInit() {
    let option: PAGE_OPTION = {
      post_id: this.post_id,
      limit: this.limit,
      //expire: ONE_HOUR_STAMP,
      fields: 'idx,idx_parent,subject,SUBSTRING(content_stripped,1,50) as content,deleted,gid,good,no_of_comment,no_of_view,post_id,stamp'
    };
    console.log('option::',option);
    this.post.page( option, ( page: PAGE ) => {
        console.log("latest: ", page);
        page.posts.map( ( v:any, i ) => {
          setTimeout( () => {
            v.url = this.post.getLink( v );
            this.posts.push( v );
          }, i * 50 );
        } );
      },
      error => alert( "Latest error: " + error ),
      () => {});
    console.log('this.posts',this.posts);
  }

}
