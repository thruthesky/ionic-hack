import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SonubForumIndexPage } from './pages/forum/index/forum-index';
import { SonubPostListPage } from './pages/forum/list/post-list';
import { SonubPostViewPage } from './pages/forum/view/post-view';
import { BaseComponentsModule } from '../../pages/base-components/base.components.module';
import { PhilgoApiModule } from '../../api/philgo-api/v2/philgo-api-module';
@NgModule( {
    declarations: [
        SonubForumIndexPage,
        SonubPostListPage,
        SonubPostViewPage
    ],
    imports: [
        BrowserModule,
        RouterModule,
        BaseComponentsModule,
        PhilgoApiModule
    ]
})
export class SonubModule {}