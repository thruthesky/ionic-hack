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



    getMessages(){
        this.message.list( {}, ( data: MESSAGE_LIST ) => {
            console.log("this.message.list() data: ", data);
             if ( data.messages.length == 0 ) return;
             this.lazyProcess(data);      
        },
        error => alert("error:" + error),
        () => {
            console.log("message list complete");
        });
    }




     lazyProcess( data: MESSAGE_LIST ) {

        this.processMessageDate(data); 
        this.data.messages = [];
            data.messages.map( ( v, i ) => {
                    setTimeout( () => {   
                        this.data.messages.push( v );
                    }, i * 50 );
            } );
     }




     processMessageDate(data: MESSAGE_LIST){
            data.messages.map( message  => {   
                message['date_created'] = this.getDate( message['stamp_created'] );
                console.log('stamp', message['stamp_created'] )
            });
     }



     getDate( stamp ) {
            let m = parseInt(stamp) * 1000;
            let d = new Date( m );
           
            let date: string;
            date = d.getFullYear() + "-";
            date += this.addZero(d.getMonth()) + "-";
            date += this.addZero(d.getDate()) + " ";
            date += this.addZero(d.getHours()) + ":";
            date += this.addZero(d.getMinutes());
                
            return date;
     }



     addZero(i : number){       
           return i >= 10 ? i : "0" + i;     
     }




}