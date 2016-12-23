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
        this.receivedPushNotification();
        
    }

    /**
     * 푸시를 등록한다.
     * 이 메쏘드는 앱이 실행 될 때마다, 로그인을 할 때 마다 실행되어야 한다.
     * 공식 문서에서는 실행 될 때 마다 등로하라고 나와 있다.
     */
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

    /**
     * ionic 에 등록한 푸시 토큰을 필고의 회원 정보에 varchar_9 에 저장한다.
     * registerPushNotification() 이 실행 될 때 자동으로 실행된다.
     */
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

    receivedPushNotification(){
        this.push.rx.notification()
            .subscribe( msg => {
                alert( msg.title + ': ' + msg.text );
                console.log( "Push notification received." );
            } );
    }


}