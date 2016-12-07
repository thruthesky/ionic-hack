import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppRouter } from './app.router';
import { ROUTES as BASE_ROUTES } from '../pages/base/base.module';
import { ROUTES as FORUM_ROUTES } from '../pages/forum/forum.module';
import { ROUTES as PHILGO_ROUTES } from '../api/philgo-api/v2/philgo-api-module';


const appRoutes: Routes = BASE_ROUTES;
FORUM_ROUTES.map( e => appRoutes.unshift( e ) );
PHILGO_ROUTES.map( e => appRoutes.unshift( e ) );

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