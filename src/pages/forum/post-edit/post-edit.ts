import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, POST_DATA } from '../../../api/philgo-api/v2/post';
import { Data, FILE_UPLOAD_RESPONSE, FILE_UPLOAD_DATA, POST_RESPONSE } from '../../../api/philgo-api/v2/data';
import * as _ from 'lodash';
@Component({
    selector: 'post-edit-page',
    templateUrl: 'post-edit.html'
})
export class PostEditPage {

    post_id: string = null;
    post_idx: string = null;
    form: POST_DATA = <POST_DATA> {};
    showProgress: boolean = false;
    files: Array<FILE_UPLOAD_DATA> = <Array<FILE_UPLOAD_DATA>>[];
    constructor( activated: ActivatedRoute, private post: Post, private data: Data ) {
        this.form.gid = data.uniqid(); // for file upload of new post
        this.post_id = activated.snapshot.params['post_id']; // it is safe to use activatedRoute even if it clicked over again on the same page.
        console.log("this.post_id", this.post_id);

        this.post_idx = activated.snapshot.params['post_idx']; // it is safe to use activatedRoute even if it clicked over again on the same page.
        console.log("this.post_idx", this.post_idx);
        
        if ( this.post_idx ) this.loadFormData();





        // this.form.subject = "Hello, nice to meet you";
        // this.form.content = "I am J. Who are you?";
        // this.onClickSubmit();
    }

    loadFormData() {
        this.post.get( this.post_idx, (re: POST_RESPONSE) => {
            console.log('post: ', re);
            this.form.gid = re.post.gid; // for file upload of post edit.
            this.form.subject = re.post.subject;
            this.form.content = re.post.content;

            // this.files = re.post.photos;

            re.post.photos.map( e => this.files.push(e) );

            console.log("this.files: ", this.files);
        }, error => alert("error: " + error) );
    }
    onClickSubmit() {
        // console.log("PostEditPage::onClickSubmit() form: ", this.form);
        this.form.post_id = this.post_id;
        this.post.create( this.form, re => {
            console.log("post create success: ", re );
        }, error => {
            alert("post create error: " + error );
        })
    }
    onClickEditSubmit() {
        this.form.idx = this.post_idx;
        this.post.update( this.form, re => {
            console.log("update success: ", re);
        }, error => alert("update error: " + error) );
    }

    onClickFileUploadButton() {
        // for camera.
        //
    }

    onChangeFile( event ) {

        this.showProgress = true;
        this.data.uploadPostFile( this.form.gid, event, (re: FILE_UPLOAD_RESPONSE) => {
            this.files.push( re.data );
            this.showProgress = false;
        }, error => {
            this.showProgress = false;
        }, completeCode => {

        }, percentage => {
            console.log("percentag uploaded: ", percentage);
        })

        /*

        let files = event.target.files;
        if ( files === void 0 ) return;

        this.showProgress = true;
        files.gid = this.form.gid;
        files.module_name = 'post';
        this.data.upload( files, (re: FILE_UPLOAD_RESPONSE) => {
            console.log("file upload success: ", re);
            this.files.push( re.data );
            this.showProgress = false;
        }, error => {
            alert("file upload failed: " + error);
        }, percentage => {
            console.log("percentag uploaded: ", percentage);
        });
        */
    }

    onClickDeleteFile( file ) {
        console.log("onClickDeleteFile: ", file);
        let data = {
            idx: file.idx
        };
        this.data.delete( data, (re) => {
            console.log("file deleted: ", re);
            _.remove( this.files, x => {
                console.log('x:', x);
                return x.idx == data.idx;
            } );
            console.log( this.files );
        }, error => {
            alert( error );
        } );

    }
}