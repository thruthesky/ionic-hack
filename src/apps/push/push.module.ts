import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { PushTestPage } from './pages/test/push-test';

export let ROUTES: Routes = [
    { path: 'push-test', component: PushTestPage }
];


@NgModule({
    declarations: [
        PushTestPage
    ],
    imports: [
        BrowserModule
    ],
    providers: []
})
export class PushModule {}
