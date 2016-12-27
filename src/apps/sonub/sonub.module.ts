import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SonubForumIndexPage } from './pages/forum/index/forum-index';
import { SonubPostListPage } from './pages/forum/list/post-list';
import { SonubPostViewPage } from './pages/forum/view/post-view';
import { BaseComponentsModule } from '../../pages/base-components/base.components.module';
import { PhilgoApiModule } from '../../api/philgo-api/v2/philgo-api-module';
import { SonubHomePage } from './pages/home/home';

import { LatestPostComponent } from './components/latest-post/latest-post-component';
//
import { LanguagePipeModule } from '../../pipes/language/language.pipe.module';

//
import { SonubHeader } from './components/header/header';
import { SonubFooter } from './components/footer/footer';
import { SonubLeft } from './components/left/left';
import { SonubRight } from './components/right/right';
import { SonubNews } from './components/news/news';
import { SonubLatestPhoto } from "./components/latest-photo/latest-photo";
import { SonubBuyAndSell } from "./components/buy-and-sell/buy-and-sell";

import { SonubLoginPage } from './pages/user/login/login';
import { SonubRegisterPage } from './pages/user/register/register';

// services
import { ForumService } from './providers/forum'


// message
import { SonubMessagePage } from './pages/message/message';



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
        SonubNews,
        LatestPostComponent,
        SonubLatestPhoto,
        SonubLoginPage,
        SonubRegisterPage,
        SonubMessagePage,
        SonubBuyAndSell
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        BaseComponentsModule,
        PhilgoApiModule,
        LanguagePipeModule
    ],
    providers: [ ForumService ]
})
export class SonubModule {}
