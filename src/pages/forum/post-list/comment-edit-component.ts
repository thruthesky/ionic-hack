import { Component, Input, NgZone, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post, POSTS, POST_RESPONSE, POST_DATA, POST, COMMENT } from '../../../api/philgo-api/v2/post';
import { Data, FILE_UPLOAD_RESPONSE, FILE_UPLOAD_DATA } from '../../../api/philgo-api/v2/data';
import * as _ from 'lodash';

@Component({
    selector: 'comment-edit',
    templateUrl: 'comment-edit-component.html'
})
export class CommentEditComponent {
    @Input() root: POST;
    /**
     *  @Attention - variable 'parent' is the current comment.
     * 
     *  If you want to reply of a comment, 'parent' is the parent.
     *  If you want to edit a comment, 'parent' is the comment you want to edit.
     */
    @Input() parent: POST;
    @Input() active: boolean = false;
    @Input() mode: 'edit' | 'reply';
    @Output() hideComment = new EventEmitter();
    comment: COMMENT = <COMMENT> {};
    showProgress: boolean = false;
    progress: number = 0;
    widthProgress: any;
    
    files: Array<FILE_UPLOAD_DATA> = <Array<FILE_UPLOAD_DATA>>[];
    
    constructor(
        private ngZone: NgZone,
        private post: Post,
        private data: Data,
        private sanitizer: DomSanitizer
        ) {
        console.log("CommentEditComponent::constructor()");
    }

    renderPage() {
        this.ngZone.run(() => {
            console.log('ngZone.run()');
        });
    }
    
    ngOnInit() {
        this.clear();
        if ( this.mode == 'edit' ) { //
            let comment = this.parent;
            this.post.get( this.parent.idx, ( re: POST_RESPONSE ) => {
                console.log("comment edit: ", re );
                this.comment = <COMMENT> re.post;
                this.hideComment.emit();
            },
            error => alert( 'comment edit: ' + error ),
            () => {

            });
        }
        else if ( this.mode == 'reply' ) {

        }
    }
    
    clear() {
        this.comment = {
            idx_parent: this.parent.idx,
            gid: this.data.uniqid(),
            content: ''
        };
        this.files = [];
    }


    /**
     * When a user click on the form to input content of comemnt for creating a comment.
     */
    onClickCommentForm( post ) {
        this.active = true; // add CSS class
    }

    /**
     * Query to philog server to create a comment.
     */
    onClickCommentCreate() {
        console.log("comment: ", this.comment);
        this.post.createComment( this.comment, (re:POST_RESPONSE) => {
            console.log( 'create comment success: ', re);
            let parent = this.parent;
            if ( parent.comments ) parent.comments.unshift( <COMMENT> re.post ); // if there are other comments,
            else parent['comments'] = [ <COMMENT> re.post ]; // if there is no comments.
            
            this.clear();
            this.active = false; // it cannot be inside this.clear()
        }, error => {
            alert('error:' + error);
        }, () => {
            //
        });
    }


    /**
     * This is for web.
     */
    onChangeCommentFile( event, post ) {
        //
        console.log("onChangeCommentFile()");
        console.log("this.comments: ", this.comment);
        this.showProgress = true;
        this.data.uploadPostFile( this.comment.gid, event,
            s => this.onSuccessFileUpload(s),
            f => this.onFailureFileUpload(f),
            c => this.onCompleteFileUpload(c),
            p => this.onProgressFileUpload(p)
        );
    }
    
    onSuccessFileUpload (re: FILE_UPLOAD_RESPONSE) {
        console.log('re.data: ', re.data);
        
        if ( this.comment.photos === void 0 ) this.comment['photos'] = [];
        this.comment.photos.push( re.data );

        // this.files.push( re.data );

        this.showProgress = false;
        this.renderPage();
    }
    onFailureFileUpload ( error ) {
        this.showProgress = false;
        alert( error );
    }
    onCompleteFileUpload( completeCode ) {
        console.log("completeCode: ", completeCode);
    }
    onProgressFileUpload( p ) {
        console.log("percentag uploaded: ", p);
        this.progress = p;
        this.widthProgress = this.sanitizer.bypassSecurityTrustStyle('width:'  + p + '%' );
        this.renderPage();
        this.renderPage();
    }


    /**
     * This is for camera.
     */
    onClickCommentFileUploadButton() {
        //
        console.log("onClickCommentFileUploadButton()");
    }
    

}