import { Component, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppRoute } from '../../../../app/app.route';
import { formProcess } from '../../../../etc/share';
import { Member, MEMBER_REGISTER_DATA } from '../../../../api/philgo-api/v2/member';
import { Data, FILE_UPLOAD_RESPONSE, FILE_UPLOAD_DATA } from '../../../../api/philgo-api/v2/data';


@Component({
    selector: 'register-page',
    templateUrl: 'register.html'
})
export class RegisterPage {
    title: string = "Register";
    
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
        this.gid = data.uniqid();
        this.setTemporaryValues();
        // this.register();
    }
    

    renderPage() {
        this.ngZone.run(() => {
            console.log('ngZone.run()');
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
        this.member.register( this.form, (login) => {
            console.log('onClickRegister(), registration sucess: ', login );
            this.route.go('/');
        },
        e => {
            console.log("onClickRegister() error: " + e);
            setTimeout(()=>this.process.setError( e ),345);
        });
    }
    
    onChangeFile(event, value) {
        let files = event.target.files;
        if ( files === void 0 ) return;
        console.log('onChangeFile(): file: ', files);
        console.log('onChangeFile(): file value: ', value);
        files.gid = this.gid;
        files.login = 'pass';
        // delete file if a file is uploaded while uploading and don't care about the file deleting error.

        this.showProgress = true;
        this.deletePrimaryPhoto( true );
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
    }

    onDeletePhoto() {
        this.deletePrimaryPhoto();
    }
    deletePrimaryPhoto( silent?: boolean ) {

        try {
            if ( this.uploadData && this.uploadData.idx ) {
                console.log("deletePrimaryPhoto(). idx: ", this.uploadData.idx );
                this.uploadData.gid = this.gid;
                this.data.delete( this.uploadData, (re) => {
                    console.log("file deleted: idx: ", re.data.idx);
                    if ( silent === void 0 || silent !== true ) {
                        this.progress = 0;
                        this.urlPhoto = this.urlDefault;
                        this.inputFileValue = '';
                    }
                }, error => {
                    alert( error );
                } );
            }
        }
        catch ( e ) {
            console.error("failed on deleting file: ", e);
        }
    }


}


