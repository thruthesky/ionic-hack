import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../../../api/philgo-api/v2/post';
import { POST_DATA } from '../../../../../api/philgo-api/v2/philgo-api-interface';

@Component({
    selector: 'sonub-post-view',
    templateUrl: 'post-view.html'
})
export class SonubPostViewPage {
    idx_post: number = 0;
    post : POST_DATA;

    constructor(
       private activated: ActivatedRoute,
       private postService : Post
         ) {

        activated.params.subscribe( param => {
            this.idx_post = param['idx_post'];
            this.loadPost(this.idx_post);
        });
    }


    loadPost(idx_post){

             this.postService.load(this.idx_post, response =>{
                 this.post = response.post;
                 console.log("Load post : ", this.post );
                 console.log("Load post success on idx : ", idx_post);
            },error =>{
                alert("Load post error" + error);
           });
    }

}
