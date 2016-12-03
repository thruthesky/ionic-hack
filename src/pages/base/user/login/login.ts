import { Component } from '@angular/core';
import { formProcess } from '../../../../etc/share';
import { Member, MEMBER_LOGIN_DATA } from '../../../../api/philgo-api/v2/member';
import { LanguagePipe } from '../../../../pipes/language/language.pipe';
@Component({
    selector: 'login-page',
    templateUrl: 'login.html'
})
export class LoginPage {
    title: string = "Login";
    form = < MEMBER_LOGIN_DATA > {};
    process = formProcess;
    constructor(
        private member: Member,
        private ln: LanguagePipe
    ) {

        this.onClickLogin();



    }
    onClickLogin() {
        console.log("LoginPage::onClickLogin()");

        this.process.loader = true;
        this.process.error = '';
        this.member.login( this.form,
                login => console.log('login success: ', login),
                er => {
                    // alert("login error:" + er);
                    console.log("member.login error: ", er );
                    this.process.error = this.ln.transform( er );
                },
                () => {
                    console.log('login complete!');
                    setTimeout( () => this.process.loader = false, 345 );
                }
            );

    }
}