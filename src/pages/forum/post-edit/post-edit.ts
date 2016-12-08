import { Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member, MEMBER_LOGIN } from '../../../api/philgo-api/v2/member';
import { Post, POST_DATA, POST_RESPONSE } from '../../../api/philgo-api/v2/post';
import { Data, FILE_UPLOAD_RESPONSE, FILE_UPLOAD_DATA, DATA_UPLOAD_OPTIONS } from '../../../api/philgo-api/v2/data';

import * as _ from 'lodash';
import * as app from '../../../etc/app.helper';
declare var navigator;
declare var Camera;
@Component({
    selector: 'post-edit-page',
    templateUrl: 'post-edit.html'
})
export class PostEditPage {
    cordova: boolean = app.isCordova();
    login: MEMBER_LOGIN = null;
    post_id: string = null;
    post_idx: string = null;
    form: POST_DATA = <POST_DATA> {};
    showProgress: boolean = false;
    progress: number = 0;
    files: Array<FILE_UPLOAD_DATA> = <Array<FILE_UPLOAD_DATA>>[];
    constructor(
        private ngZone: NgZone,
        activated: ActivatedRoute,
        private member: Member,
        private post: Post,
        private data: Data ) {
        
        member.getLogin( x => this.login = x );
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


    // for camera.
    onClickFileUploadButton() {
        if ( ! this.cordova ) return;
        let type = null;
        let re = confirm("Click 'YES' to take photo. Click 'NO' to get photo from library.");
        if ( re ) {
            // get the picture from camera.
            type = Camera.PictureSourceType.CAMERA;
        }
        else {
            // get the picture from library.
            type = Camera.PictureSourceType.PHOTOLIBRARY
        }
        console.log("in cordova, type: ", type);
        let options = {
            quality: 80,
            sourceType: type
        };
        navigator.camera.getPicture( path => {
            console.log('photo: ', path);
            // transfer the photo to the server.
            this.fileTransfer( path );
        }, e => {
            console.error( 'camera error: ', e );
            alert("camera error");
        }, options);
    }

    
    fileTransfer( fileURL: string ) {
        this.showProgress = true;
        let options: DATA_UPLOAD_OPTIONS = {
            module_name: 'post',
            gid: this.form.gid
        };
        this.data.transfer( options,
            fileURL,
            s => this.onSuccessFileUpload(s),
            f => this.onFailureFileUpload(f),
            c => this.onCompleteFileUpload(c),
            p => this.onProgressFileUpload(p)
        );
    }


    onChangeFile( event ) {
        this.showProgress = true;
        this.data.uploadPostFile( this.form.gid, event,
            s => this.onSuccessFileUpload(s),
            f => this.onFailureFileUpload(f),
            c => this.onCompleteFileUpload(c),
            p => this.onProgressFileUpload(p)
        );
    }

    onSuccessFileUpload (re: FILE_UPLOAD_RESPONSE) {
        console.log('re.data: ', re.data);
        this.files.push( re.data );
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
    onProgressFileUpload( percentage ) {
        console.log("percentag uploaded: ", percentage);
        this.progress = percentage;
        this.renderPage();
    }

    onClickDeleteFile( file ) {

        let re = confirm("Do you want to delete?");
        if ( re == false ) return;

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
    
    renderPage() {
        this.ngZone.run(() => {
            console.log('ngZone.run()');
        });
    }

}