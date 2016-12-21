import { Component, OnInit } from '@angular/core';
import { Post, SEARCH_QUERY_DATA } from '../../../../api/philgo-api/v2/post';
import { MemberRoutingService } from '../../services/user-routing/member-routing.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {
  user_result = [];
  constructor( 
    private post          : Post,
    private memberService : MemberRoutingService
  ) { 
    this.get_results();
  }

  ngOnInit() {
  }


  get_results(){
    let data = <SEARCH_QUERY_DATA>{};
        data.fields = "content, varchar_1, varchar_2, varchar_3, varchar_4, varchar_5, varchar_6, varchar_7";
        data.from   = "sf_post_data";
        data.where  = "post_id='job' AND subject='user-stat' AND varchar_1 ='"+ this.memberService.sessionData.id + "'"; 
    this.post.search( data, result =>{
      this.user_result = result.search;
    }, error => alert( 'Something went wrong' + error ) )
  }

}
