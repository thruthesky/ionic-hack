import { Component } from '@angular/core';
import { Message, MESSAGE_LIST } from '../../../../api/philgo-api/v2/message';
@Component({
    selector: 'message-page',
    templateUrl: 'message.html'
})
export class SonubMessagePage {
    HideContent = {};
    data : MESSAGE_LIST = <MESSAGE_LIST>{};
    constructor(
        private message: Message
    ) {
        console.log("SonubMessagePage::constructor()");

        this.message.list( {}, ( data: MESSAGE_LIST ) => {
            console.log("this.message.list() data: ", data);

            this.data.messages = [];
             data.messages.map( ( v, i ) => {
                setTimeout( () => {   
                    this.data.messages.push( v );
                }, i * 50 );
            } );

            //this.data = data;
        },
        error => alert("error:" + error),
        () => {
            console.log("message list complete");
        });
    }

    onClickShowContent(idx : string){
        this.HideContent[idx] = true;   
    }

     onClickHideContent(idx : string){
        this.HideContent[idx] = false;   
    }

    onClickReply(){
        alert("You we're clicking the Reply button");
    }

    onClickDelete(){
        alert("You we're clicking the Delete button");        
    }

}