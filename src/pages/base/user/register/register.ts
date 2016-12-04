import { Component } from '@angular/core';
import { AppRoute } from '../../../../app/app.route';
import { formProcess } from '../../../../etc/share';
import { Member, MEMBER_REGISTER_DATA, MEMBER_LOGIN_DATA } from '../../../../api/philgo-api/v2/member';
import { FirebaseAuth } from '../../../../api/firebase-api/firebase-auth';
import { LanguagePipe } from '../../../../pipes/language/language.pipe';

@Component({
    selector: 'register-page',
    templateUrl: 'register.html'
})
export class RegisterPage {
    title: string = "Register";
    
    form = < MEMBER_REGISTER_DATA > {};
    process = formProcess.reset();

    constructor() {}
}