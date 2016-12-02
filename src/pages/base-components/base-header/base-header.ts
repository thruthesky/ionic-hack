import { Component, Input } from '@angular/core';
@Component ({
    selector: 'base-header',
    templateUrl: 'base-header.html'
})
export class BaseHeader {
    isAllMenuActive: boolean = false;
    @Input() title: string = '';
    constructor() {

    }   
}