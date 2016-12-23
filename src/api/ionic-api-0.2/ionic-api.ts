import { Injectable } from '@angular/core';
import { Push, PushToken, PushSaveTokenOptions } from '@ionic/cloud-angular';
import { Member } from '../philgo-api/v2/member';
import * as app from '../../etc/app.helper';
@Injectable()
export class IonicApi {
    constructor(
        private push: Push,
        private member: Member
    ) {
        console.log("IonicApi::constructor()");
    }


    registerPushNotification( succssCallback: ( token: string ) => void, errorCallback: ( error : string ) => void ) {
        if ( ! app.isCordova() ) return console.info( 'Push notification : does not support browser.');
        this.push.register()
            .then( (pushToken: PushToken) => {
                let options: PushSaveTokenOptions = { ignore_user: true };
                return this.push.saveToken( pushToken, options );
            } ).then( (pushToken: PushToken) => {
                localStorage.setItem('push.token', pushToken.token );
                this.updatePhilgoToken( pushToken.token, succssCallback, errorCallback );
            }, errorCallback );
    }

    updatePhilgoToken( token: string, succssCallback: ( token: string ) => void, errorCallback: ( error : string ) => void ) {
        if ( this.member.getLoginData() ) { // if user logged in, update push token to philgo.
            this.member.update( {varchar_9: token}, re => {
                // success push registration and update it to philgo server.
                succssCallback( token );
            }, 
            errorCallback
            );
        }
    }

}