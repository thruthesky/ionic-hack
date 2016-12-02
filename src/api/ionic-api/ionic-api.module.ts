import { NgModule } from '@angular/core';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicApi } from './ionic-api';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'b3867255'
  },
  'push': {
    'sender_id': '55749236444',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [ ],
  imports: [
    CloudModule.forRoot(cloudSettings)
  ],
  providers: [ IonicApi ]
})
export class IonicApiModule {}
