import { Component, Input } from '@angular/core';
import { Member, MEMBER_LOGIN_DATA } from '../../../api/philgo-api/v2/member';
import { AppRoute } from '../../../app/app.route';
@Component ({
    selector: 'base-header',
    templateUrl: 'base-header.html'
})
export class BaseHeader {
    isAllMenuActive: boolean = false;
    @Input() title: string = '';
    login: MEMBER_LOGIN_DATA = <MEMBER_LOGIN_DATA> {};
    constructor(
        private member: Member,
        private route: AppRoute
    ) {
        setTimeout(() => this.login = this.member.logged(), 10);
    }
    onClickLogout() {
        this.member.logout();
        this.route.go('/');
    }
}