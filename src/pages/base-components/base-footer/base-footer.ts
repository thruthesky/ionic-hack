import { Component } from '@angular/core';
import { formProcess } from '../../../etc/share';
@Component({
    selector: 'base-footer',
    templateUrl: 'base-footer.html'
})
export class BaseFooter {
    process = formProcess;
    constructor() {
        console.log("BaseFooter::constructor() ", this.process);
    }
}