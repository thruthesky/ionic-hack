import { Component } from '@angular/core';
@Component({
  selector: `root-component`,
  template: `<router-outlet></router-outlet>`
})
export class RootComponent {
  constructor() {
    document.addEventListener("deviceready", () => this.onDevinceReady(), false);
  }
  onDevinceReady() {
    // yes it is cordova.
  }
}
