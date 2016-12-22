import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Deploy, DeployDownloadOptions } from '@ionic/cloud-angular';
import { IonicApi } from '../api/ionic-api-0.2/ionic-api';
@Component({
  selector: `root-component`,
  template: `
    <router-outlet></router-outlet>
  `
})
export class RootComponent {
  
  constructor(
    private router: Router,
    public deploy: Deploy,
    private ionic: IonicApi
    ) {
    document.addEventListener("deviceready", () => this.onDevinceReady(), false);
  }
  onDevinceReady() {
    console.log("yes, I am running in cordova.");
    this.updateApp();
    this.registerPushNotification();
  }
  updateApp() {
    this.updateNewSnapshot();
    setInterval( () => this.updateNewSnapshot(), 30 * 1000 );
  }
  updateNewSnapshot() {
    console.log("MyApp::updateSnapshot()");
      this.deploy.check().then( (snapshotAvailable: boolean) => {
        if ( snapshotAvailable ) { // snapshotAvailable 이 true 이면, 새로운 snapshot 을 사용 할 수 있다.
          let opt : DeployDownloadOptions = {
              onProgress: p => {
                  console.info('Downloading = ' + p + '%');
              }
          };
          this.deploy.download( opt ).then( () => { // 새로운 snapshot 을 다운로드
            let opt : DeployDownloadOptions = {
                onProgress: p => {
                    console.info('Extracting = ' + p + '%');
                }
            };
            return this.deploy.extract( opt ) // snapshot 압축 해제
              .then( () => {              
                this.router.navigateByUrl( '/' ); // base href='' 때문에 안전하게 home 으로 가서 load() 함.
                setTimeout( () => {
                  this.deploy.load(); // reload 해서 새로운 snapshot 을 적용
                }, 1234);
              } );
          });
        }
      });
  }


  registerPushNotification() {
    this.ionic.registerPushNotification(
      re => {},
      error => alert("Failed on push notification: " + error )
      );
  }


}
