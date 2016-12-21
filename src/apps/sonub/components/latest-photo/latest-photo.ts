/**
 * @see ../../../README.md
 *
 */
import { Component, Input } from '@angular/core';
import { Post, PAGE, PHOTO_OPTION, POSTS } from '../../../../api/philgo-api/v2/post';

@Component({
  selector: 'sonub-latest-photo',
  templateUrl: 'latest-photo.html'
})
export class SonubLatestPhoto {
  @Input() title: string = null;
  @Input() post_id: string = null;
  @Input() limit: number = 1;
  posts: POSTS = <POSTS> [];
  constructor( private post: Post ) {
    //console.log("LatestComponent::constructor()");
  }
  ngOnInit() {
    let option: PHOTO_OPTION = {
      post_id: this.post_id,
      limit: this.limit
    };
    console.log('option::',option);

    this.post.latestPhotos( option, (posts: POSTS) => {
      console.log("posts: ", posts);
      this.posts = [];
      posts.map( ( v:any, i ) => {
        setTimeout( () => {
          v.url = this.post.getLink( v );
          this.posts.push( v );
        }, i * 50 );
      });
    },
    error => alert("LatestPhotos Error " + error));
  }

}
