import {Component, Input, ViewChild, ElementRef } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Post, POST_RESPONSE } from '../../../api/philgo-api/v2/post';


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
      
      <textarea #content name="content" [(ngModel)]="comment.content"></textarea>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="submit()">EDIT SUBMIT</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('cancel')">Cancel</button>
    </div>
  `
})
export class CommentEditComponent {
  @ViewChild('content') content: ElementRef;
    @Input() comment;
    constructor(
      public activeModal: NgbActiveModal,
      private post: Post
    ) {

    }
    ngAfterViewInit() {
      this.content.nativeElement.focus();
    }
    submit() {
      console.log('comment edit modal form submitted.', this.comment);
      
      if ( this.comment.idx ) { // comment edit.
        this.post.update( this.comment,
          r => this.onSuccessCommentEdit( r ),
          e => this.onFailureCommentEdit( e ),
          () => this.onCompleteCommentEdit());
      }
      else { // create new comment.
        console.log("this.comment: ", this.comment);
        this.post.createComment( this.comment,
          r => this.onSuccessCommentEdit( r ),
          e => this.onFailureCommentEdit( e ),
          () => this.onCompleteCommentEdit());
      }
    }

    onSuccessCommentEdit(re:POST_RESPONSE) {
        console.log( 'create comment success: ', re);
        this.activeModal.close(re);
    }
    onFailureCommentEdit( error ) {
        alert('error:' + error);
    };
    onCompleteCommentEdit() {

    }
}
