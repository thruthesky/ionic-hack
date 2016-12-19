/**
 * @see ./README.md
 */
import { Component, Input } from '@angular/core';
import { POST_DATA } from '../../../../../api/philgo-api/v2/philgo-api-interface';
import { Post } from '../../../../../api/philgo-api/v2/post';
import { Member, MEMBER_LOGIN } from '../../../../../api/philgo-api/v2/member';
import { Router } from '@angular/router';
@Component({
  selector: 'job-base-list-component',
  templateUrl: 'job-base-list-component.html',
})
export class JobBaseListComponent {
  isPost: boolean = false;
  isComment: boolean = false;
  hideContent: boolean = false;

  today = new Date();
  currentYear = this.today.getFullYear();

  //@Input() show: boolean = false; // if set true, the create/edit form box shows.
  //@Input() mode: string = null;
  @Input() post: POST_DATA = null; // it is comment or post.
  @Input() shareUrl: string = null; // it is comment or post.
  @Input() login: MEMBER_LOGIN = {
    id: ''
  }; // it is comment or post.
  //@Input() root: POST = null;

  //active: boolean = false; // "active==true" means, the use is in editing.

  constructor(private router: Router,private _post: Post,) {
    console.log("ViewComponent()");
  }

  ngOnInit() {
    if (this.post === null) return alert("View Component Error: post is null");
    //this.isPost = this.post.idx_parent == '0';
    //this.isComment = !this.isPost;
  }


  onClickEdit(idx){
    this.router.navigate(['/job/post', idx]);
  }


  onClickDelete( post ) {
    let re = confirm("Are you sure you want to delete this post?");
    if ( re ) {
      this._post.delete( post.idx, re => {
          //console.log('delete: re: ', re);
        },
        error => alert("delete error: " + error )
      );
    }
    else {
      //console.log('delete Was Canceled');
    }
  }
}
