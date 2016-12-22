/**
 * @see ../../../README.md
 *
 */
import { Component, Input } from '@angular/core';
import { Post, PHOTO_OPTION, POSTS } from '../../../../api/philgo-api/v2/post';

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
    // console.log('option::',option);

    this.post.latestPhotos( option, (posts: POSTS) => {
      // console.log("posts: ", posts);
      this.posts = [];
      posts.map( ( v:any, i ) => {
        setTimeout( () => {
          v.url = this.post.getLink( v );
          v.date = this.getDate(v.stamp);
          this.posts.push( v );
        }, i * 50 );
      });
    },
    error => alert("LatestPhotos Error " + error));
  }

  getDate( stamp ) {
    let m = parseInt(stamp) * 1000;
    let d = new Date( m );

    let post_year = d.getFullYear();
    let post_month = d.getMonth();
    let post_date = d.getDate();

    let t = new Date();
    let today_year = t.getFullYear();
    let today_month = t.getMonth();
    let today_date = t.getDate();


    let time;
    if ( today_year == post_year && today_month == post_month && today_date == post_date ) {
      time = d.getHours() + ':' + d.getMinutes();
    }
    else {
      time = post_year + '-' + post_month + '-' + post_date;
    }
    return time;
  }

}
