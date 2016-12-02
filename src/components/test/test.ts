import { Component } from '@angular/core';
@Component({
    selector: 'test-component',
    template: '<h1>This is test</h1>'
})
export class TestComponent {
    
    constructor() {
        console.log("TestComponent::constructor()");
    }
}