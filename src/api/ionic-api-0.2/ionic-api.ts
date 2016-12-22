import { Injectable } from '@angular/core';

import { Push, PushToken, PushSaveTokenOptions } from '@ionic/cloud-angular';
@Injectable()
export class IonicApi {
    constructor(
        private push: Push
    ) {
        console.log("IonicApi::constructor()");
    }


    registerPushNotification() {
        this.push.register()
            .then( pushToken => {
                let options: PushSaveTokenOptions = { ignore_user: true };
                return this.push.saveToken( pushToken, options );
            } ).then( ( pushToken ) => {
                localStorage.setItem('push.token', pushToken.token );
                alert("Push Notification Success - Token saved:" + localStorage.getItem('push.token'));
            },  err => alert( "Push Notification Registration failed. Error:  " + err ));
    }

}