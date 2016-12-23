import { Component } from '@angular/core';
import { Message, MESSAGE_LIST } from '../../../../api/philgo-api/v2/message';
@Component({
    selector: 'message-page',
    templateUrl: 'message.html'
})
export class SonubMessagePage {


    constructor(
        private message: Message
    ) {
        console.log("SonubMessagePage::constructor()");

        this.message.list( {}, ( data: MESSAGE_LIST ) => {
            console.log("this.message.list() data: ", data);
        },
        error => alert("error:" + error),
        () => {
            console.log("message list complete");
        });
    }

}