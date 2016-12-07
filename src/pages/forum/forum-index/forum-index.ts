import { Component } from '@angular/core';
import { AppRouter } from '../../../app/app.router';
import { Member } from '../../../api/philgo-api/v2/member';
import { Post  } from '../../../api/philgo-api/v2/post';
type FORUMS = Array< { name: Array<string> } >;


@Component({
  selector: 'forum-index-page',
  templateUrl: 'forum-index.html'
})
export class ForumIndexPage {

  title: string = "Forum Index Page";

  forum_names = [ 'community', 'buyandsell', 'life', 'travel', 'love', 'news', 'info' ];
  forums: FORUMS = <FORUMS> {};


  constructor(
     private member: Member,
     private post: Post,
     private router: AppRouter
   ) {

    this.forums['community'] = ['greeting', 'knowhow', 'wanted', 'case', 'lookfor', 'phil_life_tip', 'freetalk', 'caution', 'qna', 'party'];
    this.forums['buyandsell'] = ['personal', 'buyandsell', 'biz_partner', 'massage', 'real_estate', 'phone', 'food_delivery', 'rent', 'cars', 'boarding_house'];
    this.forums['life'] = ['tagalog', 'document', 'im', 'visa'];
    this.forums['travel'] = ['golf', 'rentcar', 'hotel', 'rest', 'woman_place', 'travel_free', 'nature', 'travel_photo', 'travel_story'];
    this.forums['love'] = ['mary', 'marriage_process', 'new_marrage_story', 'group__kopino', 'kophil'];
    this.forums['news'] = ['reminder', 'database', 'typoon', 'news'];
    this.forums['info'] = ['business', 'info', 'internet', 'newcomer'];

  }

  onClickForum( post_id ) {
    this.router.go("/forum/" + post_id);
  }

}
