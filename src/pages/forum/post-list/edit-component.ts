import { Component, Input, NgZone, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post, POSTS, POST_RESPONSE, POST_DATA, POST, COMMENT } from '../../../api/philgo-api/v2/post';
import { Data, FILE_UPLOAD_RESPONSE, FILE_UPLOAD_DATA } from '../../../api/philgo-api/v2/data';
import * as _ from 'lodash';

@Component({
    selector: 'edit-component',
    templateUrl: 'edit-component.html'
})
export class EditComponent {
    @Input() root: POST;
    /**
     *  @Attention - variable 'current' is the current post or current comment.
     * 
     *  If you want to reply of a post, 'current' is the post.
     *  If you want to edit post, 'current' is the post.
     *  If you want to reply of a comment, 'parent' is the comment you want to leave a comment on.
     *  If you want to edit a comment, 'current' is the comment.
     */
    @Input() current: POST;
    @Input() active: boolean = false;
    @Input() mode: 'create-post' | 'edit-post' | 'create-comment' | 'edit-comment';
    // @Output() postLoad = new EventEmitter();
    @Output() error = new EventEmitter();
    @Output() success = new EventEmitter();
    showProgress: boolean = false;
    progress: number = 0;
    widthProgress: any;
    //files: Array<FILE_UPLOAD_DATA> = <Array<FILE_UPLOAD_DATA>>[];
    temp = <POST_DATA> {};
    constructor(
        private ngZone: NgZone,
        private post: Post,
        private data: Data,
        private sanitizer: DomSanitizer
        ) {
        console.log("EditComponent::constructor()");
    }

    renderPage() {
        this.ngZone.run(() => {
            console.log('ngZone.run()');
        });
    }
    
    ngOnInit() {
        this.reset();
        if ( this.mode == 'edit-post' || this.mode == 'edit-comment' ) { //
            console.log('without loading. mode: ', this.mode);
            this.temp = _.cloneDeep( this.current );
        }
        else if ( this.mode == 'create-post' || this.mode == 'create-comment' ) {

        }
    }
    
    reset() {
        this.temp = <POST_DATA> {};
        this.temp.gid = this.post.uniqid();

    }


    /**
     * When a user click on the form to input content of comemnt for creating a comment.
     */
    onClickCommentForm( post ) {
        this.active = true; // add CSS class
        
    }

    /**
     * Query to philog server to create/edit a post/comment.
     */
    onClickSubmit() {
        console.log("mode: ", this.mode);
        console.log("current: ", this.current);
        console.log("temp: ", this.temp);

        if ( this.mode == 'create-comment' ) this.createComment();
        else if ( this.mode == 'edit-comment' ) this.editComment();
        else this.error.emit("wrong mode");

    }

    createComment() {
        this.temp.idx_parent = this.current.idx;
        this.post.createComment( this.temp,
            s => this.successCallback( s ),
            e => this.errorCallback( e ),
            () => this.completeCallback()
        );
    }

    editComment() {
        console.log("this.comment: ", this.temp);
        this.post.update( this.temp,
            s => this.successCallback( s ),
            e => this.errorCallback( e ),
            () => this.completeCallback()
        );
    }


    successCallback( re: POST_RESPONSE ) {
        console.log( 'PhilGo API Query success: ', re);
        if ( this.mode == 'create-comment' ) {
            let current = this.current;
            if ( current.comments ) current.comments.unshift( <COMMENT> re.post ); // if there are other comments,
            else current['comments'] = [ <COMMENT> re.post ]; // if there is no comments.
        }

        this.reset();
        this.active = false; // remove 'active' css class.  it cannot be inside this.clear()
        this.success.emit();
    }
    errorCallback( error ) {
        alert( error );
    }
    completeCallback() {

    }


    /**
     * This is for web.
     */
    onChangeCommentFile( event, post ) {
        //
        console.log("onChangeCommentFile()");
        console.log("this.comments: ", this.temp);
        this.showProgress = true;
        this.data.uploadPostFile( this.temp.gid, event,
            s => this.onSuccessFileUpload(s),
            f => this.onFailureFileUpload(f),
            c => this.onCompleteFileUpload(c),
            p => this.onProgressFileUpload(p)
        );
    }
    
    onSuccessFileUpload (re: FILE_UPLOAD_RESPONSE) {
        console.log('re.data: ', re.data);
        if ( this.temp.photos === void 0 ) this.temp['photos'] = [];
        this.temp.photos.push( re.data );
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