import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SonubForumIndexPage } from './pages/forum/index/forum-index';
import { SonubPostListPage } from './pages/forum/list/post-list';
import { SonubPostViewPage } from './pages/forum/view/post-view';
import { BaseComponentsModule } from '../../pages/base-components/base.components.module';
import { PhilgoApiModule } from '../../api/philgo-api/v2/philgo-api-module';
import { SonubHomePage } from './pages/home/home';

//
import { LanguagePipeModule } from '../../pipes/language/language.pipe.module';

//
import { SonubHeader } from './components/header/header';
import { SonubFooter } from './components/footer/footer';
import { SonubLeft } from './components/left/left';
import { SonubRight } from './components/right/right';
import { SonubNews } from './components/news/news';

// services
import { ForumService } from './providers/forum'
@NgModule( {
    declarations: [
        SonubHomePage,
        SonubForumIndexPage,
        SonubPostListPage,
        SonubPostViewPage,
        SonubHeader,
        SonubFooter,
        SonubRight,
        SonubLeft,
        SonubNews
    ],
    imports: [
        BrowserModule,
        RouterModule,
        BaseComponentsModule,
        PhilgoApiModule,
        LanguagePipeModule
    ],
    providers: [ ForumService ]
})
export class SonubModule {}
