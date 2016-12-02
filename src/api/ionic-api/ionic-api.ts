import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Push, PushToken } from '@ionic/cloud-angular';

@Injectable()
export class IonicApi {
    constructor(
        private http: Http,
        private push: Push 
    ) {
        console.log("IonicApi::constructor()");
    }



    registerPushNotfication() {
        console.log("IonicApi::registerPushNotfication()");
        this.push.register() // ask server to generate a token.
            .then( (pushToken: PushToken) => { // server did.
                console.log("IonicApi::registerPushNotfication() success.");
                alert("IonicApi::registerPushNotfication() success.");
                localStorage.setItem( 'pushToken', JSON.stringify(pushToken) );
                this.push.saveToken(pushToken) // after save, you can send notificaton.
                    .then(
                        (pushToken: PushToken) => { },
                        (error) => alert('error on saveToken()')
                     );
            }, ( e ) => {
                console.log(e);
                alert("Error on registerPushNotfication( )"); } );
    }
}