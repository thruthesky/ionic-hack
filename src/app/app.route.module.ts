import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppRouter } from './app.router';

//import { BASE_ROUTES } from '../pages/base/base.module';
//import { FORUM_ROUTES } from '../pages/forum/forum.module';
//import { ROUTES as PHILGO_ROUTES } from '../api/philgo-api/v2/philgo-api-module';
//import { ROUTES as PUSH_ROUTES } from '../apps/push/push.module';
//import { ROUTES as JOB_ROUTES } from '../apps/job/app/job.module';

//let appRoutes: Routes = BASE_ROUTES;
//PHILGO_ROUTES.map( e => appRoutes.unshift( e ) );
//PUSH_ROUTES.map( e => appRoutes.unshift( e ) );
//JOB_ROUTES.map( e => appRoutes.unshift( e ) );
//FORUM_ROUTES.map( e => appRoutes.unshift( e ) );


/**
 * production version 에서 위와 같이 router 를 모아서 실행을 하면 안된다. dev version 에서 웹/앱 모두 잘 되었다.
 * 하지만 이렇게 하는 것이 0.0001 초라도 빠르지 않을까 생각한다.
 */
import { ForumIndexPage } from '../pages/forum/forum-index/forum-index';
import { PostListPage } from '../pages/forum/post-list/post-list';
import { PostViewPage } from '../pages/forum/post-view/post-view';

import { HomePage } from '../pages/base/home/home';
import { FileNotFoundPage } from '../pages/base/file-not-found/file-not-found';

import { RegisterPage } from '../pages/base/user/register/register';
import { LoginPage } from '../pages/base/user/login/login';


import { JobIndexComponent } from '../apps/job/pages/job-index/job-index.component';
import { JobListComponent } from "../apps/job/pages/job-list/job-list.component";
import { JobEditComponent } from "../apps/job/pages/job-edit/job-edit.component";


// sonub forum index.
import { SonubForumIndexPage } from '../apps/sonub/pages/forum/index/forum-index';
import { SonubPostListPage } from '../apps/sonub/pages/forum/list/post-list';
import { SonubPostViewPage } from '../apps/sonub/pages/forum/view/post-view';

let appRoutes: Routes = [

    // for new forum.
    { path: "forum", component: SonubForumIndexPage },
    { path: "forum/:post_id", component: SonubPostListPage },
    { path: "-/:idx_post", component: SonubPostViewPage },

    // job
    { path: "job", component: JobIndexComponent },
    { path: "job/post", component: JobEditComponent },
    { path: "job/post/:idx", component: JobEditComponent },
    { path: "job/list", component: JobListComponent },

    // forum
    { path: 'forum-b', component: ForumIndexPage },
    { path: 'forum-b/:post_id', component: PostListPage },
    { path: 'b-/:idx_post', component: PostViewPage },
    
    // base user
    { path: 'user/register', component: RegisterPage },
    { path: 'user/login', component: LoginPage },

    // default pages.
    { path: '', component: HomePage },
    { path: '**', component: FileNotFoundPage }
];


// console.log( appRoutes );

@NgModule({
    imports: [
        RouterModule.forRoot( appRoutes )
    ],
    exports: [
        RouterModule
    ],
    providers: [ AppRouter ]
})
export class AppRouteModule {}
