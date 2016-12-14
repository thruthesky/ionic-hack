import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { LanguagePipeModule } from '../../pipes/language/language.pipe.module';

import { BaseComponentsModule } from '../base-components/base.components.module';
import { ForumIndexPage } from './forum-index/forum-index';
import { PostListPage } from './post-list/post-list';
import { PostEditPage } from './post-edit/post-edit';
import { PostViewPage } from './post-view/post-view';
// import { CommentEditComponent } from './post-list/comment-edit-modal-component';

import { EditComponent } from './post-list/edit-component';

export let FORUM_ROUTES: Routes = [
  { path: 'forum', component: ForumIndexPage },
  { path: 'forum/:post_id', component: PostListPage },
  { path: 'post/create/:post_id', component: PostEditPage },
  { path: 'post/edit/:post_idx', component: PostEditPage },
  { path: '-/:idx_post', component: PostViewPage }
];


@NgModule({
    declarations: [
        ForumIndexPage,
        PostListPage,
        PostEditPage,
        EditComponent,
        PostViewPage
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