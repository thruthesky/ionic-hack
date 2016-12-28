import { Component, style, animate, transition, trigger } from '@angular/core';
import { Message, MESSAGE, MESSAGES, MESSAGE_LIST, MESSAGE_FORM } from '../../../../api/philgo-api/v2/message';
@Component({
    selector: 'message-page',
    templateUrl: 'message.html'
})
export class SonubMessagePage {
    // data : MESSAGE_LIST = <MESSAGE_LIST>{};
    messages: MESSAGES = [];
    showCreateForm: boolean = false;
    form: MESSAGE_FORM = <MESSAGE_FORM> {};
    showSearchForm: boolean = false;
    key: string = null;
    page_no: number = 0;
    constructor(
        private message: Message
    ) {
        console.log("SonubMessagePage::constructor()");
        this.getMessages();
        // setTimeout ( () => this.getMessages(), 1000 );
        // setTimeout ( () => this.getMessages(), 2000 );
    }

    onClickShowContent(message : MESSAGE){
        message['show_content'] = true;

        if ( message.stamp_open != "0" ) return;

        this.message.opened( message.idx, data => {
            console.log("onClickShowContent() : data: ", data);
            message.stamp_open = "1";
        },
        error => alert("error on reading: " + error ),
        () => {}
        );  
    }



    onClickHideContent(message : MESSAGE){
        message['show_content'] = false;  
    }

    

    onClickReplyFormSubmit( message: MESSAGE ) {
        console.log("onClickReplyFormSubmit(): ", message);
        this.form.id_recv = message.from.id;
        this.message.send( this.form, data => {
            console.log("reply sucess: ", data);
            message['showReplyForm'] = false;
        },
        error => alert("error on reply: " + error),
        () => {} );
    }

    getMessages( key = '' ) {
        this.page_no ++;
        this.message.list( { key: key, page_no: this.page_no }, ( data: MESSAGE_LIST ) => {
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
        //this.data.messages = [];
        data.messages.map( ( v, i ) => {
                setTimeout( () => {   
                    this.messages.push( v );
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



    onClickCreateFormSubmit() {
        this.message.send( this.form, re => {
            console.log("message send success: ", re);
        },
        error => alert("message sending error: " + error ),
        () => { }
        );
    }


    onClickMakeAllRead() {
        this.message.makeAllRead( re => {
            console.log("make all read sucess: ", re);
            //this.data = <MESSAGE_LIST>{};
            this.messages = [];
            this.getMessages();
        },
        error => alert("error on make all read: " + error),
        () => {} );
    }

    onClickSearchFormSubmit() {
        if ( this.showSearchForm === false ) {
            this.showSearchForm = true;
            return;
        }
        
        //this.data = <MESSAGE_LIST>{};
        //this.message.debug = true;
        this.messages = [];
        this.getMessages( this.key );
    }


    onClickDelete( message: MESSAGE ) {
        let re = confirm("Do you want to delete this message?");
        if ( ! re ) return;
        this.message.delete( message.idx, re => {
            console.log("message delete success: ", re);
            message.idx = null;
        },
        error => alert("error on message delete: " + error ),
        () => {} );
    }



}