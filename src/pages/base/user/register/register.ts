import { Component, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppRoute } from '../../../../app/app.route';
import { formProcess } from '../../../../etc/share';
import { Member, MEMBER_DATA, MEMBER_REGISTER_DATA, MEMBER_LOGIN } from '../../../../api/philgo-api/v2/member';
import { Data, FILE_UPLOAD_RESPONSE, FILE_UPLOAD_DATA } from '../../../../api/philgo-api/v2/data';


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
    constructor(
        private member: Member,
        private data: Data,
        private route: AppRoute,
        private sanitizer: DomSanitizer,
        private ngZone: NgZone
    ) {
        member.getLogin( x => this.login = x );
        this.loadFormData();
        this.gid = data.uniqid();
    }
    

    renderPage() {
        this.ngZone.run(() => {
            console.log('ngZone.run()');
        });
    }
    loadFormData() {
        // don't check login here since, login is non-blocking code.
        this.member.data( (data:MEMBER_DATA) => {
            // console.log(data);
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
                this.data.updateMemberIdx( this.gid, login.idx_member, re => {
                    console.log("file 'idx_member' update success: ", re );
                    this.route.go('/');
                }, error => alert( 'file idx_member update error: ' + error ) );
            }
            else this.route.go('/');
        },
        e => {
            console.log("onClickRegister() error: " + e);
            setTimeout(()=>this.process.setError( e ),345);
        });
    }


    onClickUpdate() {

    }
    
    onChangeFile(event, value) {
        let files = event.target.files;
        if ( files === void 0 ) return;
        console.log('onChangeFile(): file: ', files);
        console.log('onChangeFile(): file value: ', value);

        // @todo wrap this with member.uploadPhoto();, member.deletePhoto(), member.updatePhoto();
        // delete file if a file is uploaded while uploading and don't care about the file deleting error.

        this.showProgress = true;
        this.deletePrimaryPhoto( true );

        if ( this.login ) {
            this.data.uploadPrimaryPhoto( files,
                x => this.successPrimaryPhotoUpload( x ),
                e => this.failurePrimaryPhotoUpload( e ),
                p => this.progressPrimaryPhotoUpload( p )
            );
        }
        else {
            this.data.uploadAnonymousPrimaryPhoto( this.gid, files,
                x => this.successPrimaryPhotoUpload( x ),
                e => this.failurePrimaryPhotoUpload( e ),
                p => this.progressPrimaryPhotoUpload( p )
            );
        }

/*
        this.member.uploadAnonymousPrimaryPhoto( this.gid, files, ( re: FILE_UPLOAD_RESPONSE ) => {
            //
            this.uploadData = re.data;
            console.log("data.upload() success: re: ", re);
            this.urlPhoto = re.data.url_thumbnail;
            this.progress = 0;
            this.showProgress = false;
            },
            error => alert( error ),
            progress => {
                this.progress = progress;
                // console.log("file uploading: ", this.progress);
                this.renderPage();
                this.widthProgress = this.sanitizer.bypassSecurityTrustStyle('width:'  + progress + '%' );
            }
        );
        */
        /*
        this.data.upload( files, ( re: FILE_UPLOAD_RESPONSE ) => {
            //
            this.uploadData = re.data;
            console.log("data.upload() success: re: ", re);
            this.urlPhoto = re.data.url_thumbnail;
            this.progress = 0;
            this.showProgress = false;
            },
            error => alert( error ),
            progress => {
                this.progress = progress;
                // console.log("file uploading: ", this.progress);
                this.renderPage();
                this.widthProgress = this.sanitizer.bypassSecurityTrustStyle('width:'  + progress + '%' );
            }
        );
        */
    }

    successPrimaryPhotoUpload( re: FILE_UPLOAD_RESPONSE ) {
        this.uploadData = re.data;
        console.log("data.upload() success: re: ", re);
        this.urlPhoto = re.data.url_thumbnail;
        this.progress = 0;
        this.showProgress = false;
    }

    failurePrimaryPhotoUpload( e ) {
        alert( e );
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


