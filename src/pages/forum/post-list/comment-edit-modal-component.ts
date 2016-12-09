import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Post, POSTS, POST_RESPONSE, POST_DATA } from '../../../api/philgo-api/v2/post';


@Component({
  selector: 'comment-edit-modal',
  template: `
    <div class="modal-header">
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="modal-title">Edit Comment: {{comment.idx}}</div>
    </div>
    <div class="modal-body">
      
      <textarea name="content" [(ngModel)]="comment.content"></textarea>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="submit()">EDIT SUBMIT</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('cancel')">Cancel</button>
    </div>
  `
})
export class CommentEditComponent {
    @Input() comment;
    constructor(
      public activeModal: NgbActiveModal,
      private post: Post
    ) {}
    submit() {
      console.log('comment edit modal form submitted.', this.comment);
      
      this.post.update( this.comment, (re:POST_RESPONSE) => {
          console.log( 'create comment success: ', re);
          this.activeModal.close('updated');
      }, error => {
          alert('error:' + error);
      }, () => {

      });
    }
}
