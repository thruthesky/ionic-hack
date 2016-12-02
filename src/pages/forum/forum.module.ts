import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



//import { BaseComponentsModule } from '../base/components/base.components.module';
import { ForumIndexPage } from './forum-index/forum-index';


export let ROUTES: Routes = [
  { path: 'forum', component: ForumIndexPage }
];

@NgModule({
    declarations: [
        ForumIndexPage
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule
  //      BaseComponentsModule
    ],
    providers: []
})
export class ForumModule {}