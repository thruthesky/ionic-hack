import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { LanguagePipeModule } from '../../pipes/language/language.pipe.module';

import { BaseComponentsModule } from '../base-components/base.components.module';
import { ForumIndexPage } from './forum-index/forum-index';
import { PostListPage } from './post-list/post-list';
import { PostEditPage } from './post-edit/post-edit';
// import { CommentEditComponent } from './post-list/comment-edit-modal-component';

import { CommentEditComponent } from './post-list/comment-edit-component';

export let ROUTES: Routes = [
  { path: 'forum', component: ForumIndexPage },
  { path: 'forum/:post_id', component: PostListPage },
  { path: 'post/create/:post_id', component: PostEditPage },
  { path: 'post/edit/:post_idx', component: PostEditPage }
];

@NgModule({
    declarations: [
        ForumIndexPage,
        PostListPage,
        PostEditPage,
        CommentEditComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        BaseComponentsModule,
        LanguagePipeModule,
        InfiniteScrollModule
    ],
    providers: [],
    entryComponents: [
         CommentEditComponent
    ]
})
export class ForumModule {}