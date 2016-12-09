import { Component } from '@angular/core';
@Component({
  selector: `root-component`,
  template: `
    <router-outlet></router-outlet>
    <template ngbModalContainer></template>
  `
})
export class RootComponent {
  constructor() {
    document.addEventListener("deviceready", () => this.onDevinceReady(), false);
  }
  onDevinceReady() {
    // yes it is cordova.
  }
}
