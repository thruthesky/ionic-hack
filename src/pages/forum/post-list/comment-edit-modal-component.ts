import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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
      
      <textarea>{{comment.content}}</textarea>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="submit('submit')">EDIT SUBMIT</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class CommentEditComponent {
    @Input() comment;
    constructor(public activeModal: NgbActiveModal) {}
    submit( str ) {
      console.log('submit: ', str);
    }
}