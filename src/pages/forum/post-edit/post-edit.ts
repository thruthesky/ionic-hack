import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, POST_DATA } from '../../../api/philgo-api/v2/post';
import { Data, FILE_UPLOAD_RESPONSE, FILE_UPLOAD_DATA } from '../../../api/philgo-api/v2/data';
@Component({
    selector: 'post-edit-page',
    templateUrl: 'post-edit.html'
})
export class PostEditPage {

    post_id: string = null;
    form: POST_DATA = <POST_DATA> {};
    showProgress: boolean = false;
    gid: string = null;
    files: Array<FILE_UPLOAD_DATA> = [];
    constructor( activated: ActivatedRoute, private post: Post, private data: Data ) {
        this.gid = data.uniqid();
        this.post_id = activated.snapshot.params['post_id']; // it is safe to use activatedRoute even if it clicked over again on the same page.
        this.form.subject = "Hello, nice to meet you";
        this.form.content = "I am J. Who are you?";
        // this.onClickSubmit();
    }
    onClickSubmit() {
        console.log("PostEditPage::onClickSubmit() form: ", this.form);
        this.form.post_id = this.post_id;
        this.post.create( this.form, re => {
            console.log("post create success: ", re );
        }, error => {
            alert("post create error: " + error );
        })
    }

    onClickFileUploadButton() {
        // for camera.
    }

    onChangeFile( event ) {
        let files = event.target.files;
        if ( files === void 0 ) return;

        this.showProgress = true;
        files.gid = this.gid;
        files.module_name = 'post';
        this.data.upload( files, (re: FILE_UPLOAD_RESPONSE) => {
            console.log("file upload success: ", re);
            this.files.push( re.data );
        }, error => {
            alert("file upload failed: " + error);
        }, percentage => {
            console.log("percentag uploaded: ", percentage);
        });
        
    }
}