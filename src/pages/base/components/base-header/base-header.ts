import { Component, Input } from '@angular/core';
@Component ({
    selector: 'base-header',
    templateUrl: 'base-header.html'
})
export class BaseHeader {
    @Input() title: string = '';
    constructor() {

    }   
}