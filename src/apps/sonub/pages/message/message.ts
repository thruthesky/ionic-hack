import { Component, style, animate, transition, trigger } from '@angular/core';
import { Message, MESSAGE, MESSAGE_LIST } from '../../../../api/philgo-api/v2/message';
@Component({
    selector: 'message-page',
    templateUrl: 'message.html',
    animations: [
    trigger('slide', [
        transition(':enter', [   // :enter is alias to 'void => *'
         style({height: 0, margin:0}),
        animate(500, style({ height:'*' })) 
        ]),
        transition(':leave', [   // :leave is alias to '* => void'
        style({ margin:0}),
        animate(500, style({ height:0 })) 
        ])
  ])
]
})
export class SonubMessagePage {
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
        },
        error => alert("error:" + error),
        () => {
            console.log("message list complete");
        });
    }

    onClickShowContent(message : MESSAGE){
        message['show_content'] = true;  
    }

     onClickHideContent(message : MESSAGE){
       message['show_content'] = false;  
    }

    loading_content_start(message : MESSAGE){
        message['loading_content']  = true;
    }

    loading_content_done(message : MESSAGE){
       message['loading_content'] = false;
    }

    onClickReply(){
        alert("You we're clicking the Reply button");
    }

    onClickDelete(){
        alert("You we're clicking the Delete button");        
    }


}