import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



import { LanguagePipeModule } from '../../pipes/language/language.pipe.module';

import { BaseComponentsModule } from '../base-components/base.components.module';
import { ForumIndexPage } from './forum-index/forum-index';
import { PostListPage } from './post-list/post-list';
import { PostEditPage } from './post-edit/post-edit';


export let ROUTES: Routes = [
  { path: 'forum', component: ForumIndexPage },
  { path: 'forum/:post_id', component: PostListPage },
  { path: 'post/create/:post_id', component: PostEditPage }
];

@NgModule({
    declarations: [
        ForumIndexPage,
        PostListPage,
        PostEditPage
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        BaseComponentsModule,
        LanguagePipeModule
    ],
    providers: []
})
export class ForumModule {}