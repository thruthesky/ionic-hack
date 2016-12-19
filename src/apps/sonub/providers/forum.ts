import { Injectable } from '@angular/core';
type FORUMS = Array< { name: Array<string> } >;


@Injectable()
export class ForumService {
    forum_names = [ 'community', 'buyandsell', 'life', 'travel', 'love', 'news', 'info' ];
    forums: FORUMS = <FORUMS> {};


    constructor() {

        this.forums['community'] = ['greeting', 'knowhow', 'wanted', 'case', 'lookfor', 'phil_life_tip', 'freetalk', 'caution', 'qna', 'party'];
        this.forums['buyandsell'] = ['personal', 'buyandsell', 'biz_partner', 'massage', 'real_estate', 'phone', 'food_delivery', 'rent', 'cars', 'boarding_house'];
        this.forums['life'] = ['tagalog', 'document', 'im', 'visa'];
        this.forums['travel'] = ['golf', 'rentcar', 'hotel', 'rest', 'woman_place', 'travel_free', 'nature', 'travel_photo', 'travel_story'];
        this.forums['love'] = ['marry', 'marriage_process', 'new_marrage_story', 'group__kopino', 'kophil'];
        this.forums['news'] = ['reminder', 'database', 'typoon', 'news'];
        this.forums['info'] = ['business', 'info', 'internet', 'newcomer'];

    }
}