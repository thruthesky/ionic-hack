import { Component, style, animate, transition, trigger } from '@angular/core';
import { Message, MESSAGE, MESSAGE_LIST } from '../../../../api/philgo-api/v2/message';
@Component({
    selector: 'message-page',
    templateUrl: 'message.html'
})
export class SonubMessagePage {
    data : MESSAGE_LIST = <MESSAGE_LIST>{};
   
    constructor(
        private message: Message
    ) {
        console.log("SonubMessagePage::constructor()");
        this.getMessages(); 
    }

    getMessages(){
        this.message.list( {}, ( data: MESSAGE_LIST ) => {
            console.log("this.message.list() data: ", data);
            this.lazyProcess(data);      
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

    
    onClickReply(){
        alert("You we're clicking the Reply button");
    }

    onClickDelete(){
        alert("You we're clicking the Delete button");        
    }

    lazyProcess( data: MESSAGE_LIST ) {
        if ( data.messages.length == 0 ) {
        return;
        }

        // for date.
        data.messages.map( message  => {   
             message['date_created'] = this.getDate( message['stamp_created'] );
             console.log('stamp', message['stamp_created'] )
        });

        //for lazy loading message
        this.data.messages = [];
                data.messages.map( ( v, i ) => {
                    setTimeout( () => {   
                        this.data.messages.push( v );
                    }, i * 50 );
            } );
  }

     getDate( stamp ) {
            let m = parseInt(stamp) * 1000;
            let d = new Date( m );
            let date: string;
                date = d.getFullYear() + "-";
                date += this.formatTo2Digit_date(d.getMonth()) + "-";
                date += this.formatTo2Digit_date(d.getDate()) + " ";
                date += this.formatTo2Digit_date(d.getHours()) + ":";
                date += this.formatTo2Digit_date(d.getMinutes()) + ":";
                
               return date;
        }
     formatTo2Digit_date(n : number){       
           return n>=10? n : "0"+n;     
     }

}