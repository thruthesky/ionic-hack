import { Component } from '@angular/core';
import { AppRoute } from '../../../../app/app.route';
import { formProcess } from '../../../../etc/share';
import { Member, MEMBER_REGISTER_DATA } from '../../../../api/philgo-api/v2/member';
import { Data } from '../../../../api/philgo-api/v2/data';


@Component({
    selector: 'register-page',
    templateUrl: 'register.html'
})
export class RegisterPage {
    title: string = "Register";
    
    form = < MEMBER_REGISTER_DATA > {};
    process = formProcess.reset();

    pathPhoto = "assets/img/anonymous.gif";

    constructor(
        private member: Member,
        private data: Data,
        private route: AppRoute
    ) {
        this.setTemporaryValues();
        // this.register();
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
        
        this.data.upload( files, ( re ) => {
            //
            console.log(re);
            let data = JSON.parse( re['response'] );
            console.log("data.upload() success: data: ", data);
        }, error => alert( error ));
    }


}


