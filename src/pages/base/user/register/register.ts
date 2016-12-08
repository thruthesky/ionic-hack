import { Component, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppRouter } from '../../../../app/app.router';
import { formProcess } from '../../../../etc/share';
import { Member, MEMBER_DATA, MEMBER_REGISTER_DATA, MEMBER_LOGIN } from '../../../../api/philgo-api/v2/member';
import { Data, FILE_UPLOAD_RESPONSE, FILE_UPLOAD_DATA, DATA_UPLOAD_OPTIONS, CODE_PRIMARY_PHOTO } from '../../../../api/philgo-api/v2/data';
import * as app from '../../../../etc/app.helper';


declare var navigator;
declare var Camera;
declare var FileUploadOptions;
declare var FileTransfer;

@Component({
    selector: 'register-page',
    templateUrl: 'register.html'
})
export class RegisterPage {
    title: string = "Register";

    login: MEMBER_LOGIN = null;
    memberData: MEMBER_DATA = null;
    
    form = < MEMBER_REGISTER_DATA > {};
    process = formProcess.reset();

    urlDefault: string = "assets/img/anonymous.gif";
    urlPhoto: string = this.urlDefault;
    uploadData: FILE_UPLOAD_DATA;
    gid: string = null;

    showProgress: boolean = false;
    progress: number = 0;
    widthProgress: any;
    inputFileValue: string = null;

    cordova: boolean = app.isCordova();
    constructor(
        private member: Member,
        private data: Data,
        private router: AppRouter,
        private sanitizer: DomSanitizer,
        private ngZone: NgZone
    ) {
        
        this.gid = data.uniqid();
        member.getLogin( x => {
            this.login = x;
            this.gid = this.login.id;
        });
        this.loadFormData();

        setTimeout( () => {
        // this.fileTransfer( 'file:///storage/emulated/0/Android/data/com.ionicframework.hack2778871/cache/1481039907916.jpg' );

        }, 3000);
    }
    

    renderPage() {
        this.ngZone.run(() => {
            console.log('ngZone.run()');
        });
    }
    loadFormData() {
        // don't check login here since, login is non-blocking code.
        this.member.data( (data:MEMBER_DATA) => {
            console.log(data);
            this.memberData = data;
            if ( data.user_url_primary_photo ) this.urlPhoto = data.user_url_primary_photo;
            this.form.name = data.name;
            this.form.email = data.email;
            this.form.gender = data.gender;
            this.form.mobile = data.mobile;
            this.form.birthday = this.member.getBirthdayFormValue( data );
        }, error => {
            console.log('error: ', error);
        });
        
    }
    setTemporaryValues(pre='') {
        let f = this.form;
        let d = new Date();
        f.id = "temp-" + d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds();

        if ( ! pre ) f.password = 'pass-' + f.id;

        f.name = pre + 'name-' + f.id;
        if ( pre == '' ) f.nickname = 'nickname-' + f.id;
        else f.nickname = '';
        f.email = pre + 'email-' + f.id + '@gmail.com';
        f.mobile = pre + '10123456789';
        f.gender = pre ? 'M' : 'F';
        f.birthday = '1973-10-16';
    }

    onClickRegister() {
        this.register();
    }

    register() {
        this.process.begin();
        this.form.nickname = this.form.name;
        this.member.register( this.form, (login) => {
            // register success
            console.log('onClickRegister(), registration sucess: ', login );
            //
            if ( this.photoUploaded() ) {
                // if user uploaded primary photo on register, then update the file.idx_member
                this.data.updateMemberIdx( this.gid, re => {
                    console.log("file 'idx_member' update success: ", re );
                    this.router.go('/');
                }, error => alert( 'file idx_member update error: ' + error ) );
            }
            else this.router.go('/');
        },
        e => {
            console.log("onClickRegister() error: " + e);
            setTimeout(()=>this.process.setError( e ),345);
        });
    }

    onClickUpdate() {
        this.process.begin();
        this.member.update( this.form, login => {
            alert("User profile updated!");
        },
        error => {
            alert('error on update user profile: ' + error );
        },
        () => {

        })
    }
    
    onChangeFile(event, value) {
        this.showProgress = true;
        // if not logged in, then delete previous primary photo. If logged in, automatically deleted.
        if ( this.login == null ) this.deletePrimaryPhoto( true ); // delete only when user did not logged in. when a user logged in, the primary photo will be automatically deleted.
        if ( this.login ) {
            this.data.uploadPrimaryPhoto( event, // without gid.
                x => this.successPrimaryPhotoUpload( x ),
                e => this.failurePrimaryPhotoUpload( e ),
                c => console.log("completeCode: ", c),
                p => this.progressPrimaryPhotoUpload( p )
            );
        }
        else {
            this.data.uploadAnonymousPrimaryPhoto( this.gid, event, // with gid.
                x => this.successPrimaryPhotoUpload( x ),
                e => this.failurePrimaryPhotoUpload( e ),
                c => console.log("completeCode: ", c),
                p => this.progressPrimaryPhotoUpload( p )
            );
        }
    }
    
    onClickPrimaryPhoto() {
        if ( ! this.cordova ) return;
        console.log("in cordova, onClickPrimaryPhoto(): ");
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
            module_name: 'member',
            code: CODE_PRIMARY_PHOTO
        };
        if ( this.login == null ) {
            options.gid = this.gid,
            options.finish = '0';
            options.login = 'pass';
            // if not logged in, then delete previous primary photo. If logged in, automatically deleted.
            this.deletePrimaryPhoto( true ); // delete only when user did not logged in. when a user logged in, the primary photo will be automatically deleted.
        }
        else {
            options.gid = this.login.id;
            options.finish = '1';
        }

        this.data.transfer( options,
            fileURL,
            x => this.successPrimaryPhotoUpload( x ),
            e => this.failurePrimaryPhotoUpload( e ),
            c => console.log("completeCode: ", c),
            p => this.progressPrimaryPhotoUpload( p )
        );
    }

    fileTransfer_old( fileURL: string ) {
        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
        var ft = new FileTransfer();
        let percentage = 0;
        ft.onprogress = progressEvent => {
            // @todo This is not working....
            if (progressEvent.lengthComputable) {
                try {
                    percentage = Math.round( progressEvent.loaded / progressEvent.total );
                }
                catch ( e ) {
                    console.error( 'percentage computation error' );
                    percentage = 10;
                }
            }
            else percentage = 10; // progressive does not work. it is not computable.
            this.renderPage();
        };

        let uri: string;
        if ( this.login ) uri = this.data.getUploadUrlPrimaryPhoto();
        else uri = this.data.getUploadUrlAnonymousPrimaryPhoto( this.gid );
        
        console.log("file transfer to : ", uri);
        uri = encodeURI( uri );
        
        if ( this.login == null ) this.deletePrimaryPhoto( true ); // delete current photo if ever.
        ft.upload(fileURL, uri, r => {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            let re;
            try {
                re = JSON.parse( r.response );
            }
            catch ( e ) {
                this.failurePrimaryPhotoUpload( "JSON parse error on server response while file transfer..." );
                return;
            }
            this.successPrimaryPhotoUpload( re );

        }, e => {
            // alert("An error has occurred: Code = " + e.code);
            console.log("upload error source " + e.source);
            console.log("upload error target " + e.target);
            this.failurePrimaryPhotoUpload( e.code );
        }, options);
    }


    successPrimaryPhotoUpload( re: FILE_UPLOAD_RESPONSE ) {
        console.log("data.upload() success: re: ", re);
        this.uploadData = re.data;
        this.urlPhoto = re.data.url_thumbnail;
        this.progress = 0;
        this.showProgress = false;
        setTimeout( () => this.renderPage(), 200 );
    }

    failurePrimaryPhotoUpload( e ) {
        alert( "An error has occured while uploading: Code = " + e );
    }

    progressPrimaryPhotoUpload( p ) {
        this.progress = p;
        this.widthProgress = this.sanitizer.bypassSecurityTrustStyle('width:'  + p + '%' );
        this.renderPage();
    }

    onDeletePhoto() {
        this.deletePrimaryPhoto();
    }

    deletePrimaryPhoto( silent?: boolean ) {
        try {
            let idx = this.photoUploaded();
            if ( idx ) {
                
                console.log("deletePrimaryPhoto(). idx: ", idx );
                let data = {
                    idx: idx,
                    gid: this.gid
                }
                this.data.delete( data, (re) => {
                    console.log("file deleted: idx: ", re.data.idx);
                    if ( silent === void 0 || silent !== true ) {
                        this.progress = 0;
                        this.urlPhoto = this.urlDefault;
                        this.inputFileValue = '';
                    }
                    this.uploadData = null;
                }, error => {
                    alert( error );
                } );
            }
        }
        catch ( e ) {
            console.error("failed on deleting file: ", e);
        }
    }


    /**
     * Returns file.idx of primary photo if the user has photo.
     */
    photoUploaded() : number {
        if ( this.uploadData && this.uploadData.idx ) return this.uploadData.idx;
        if ( this.memberData && this.memberData.user_url_primary_photo ) return this.data.getIdxFromUrl( this.memberData.user_url_primary_photo );
        return 0;
    }



}


