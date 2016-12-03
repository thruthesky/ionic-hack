
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { BaseHeader } from './base-header/base-header';
import { BaseFooter } from './base-footer/base-footer';
import { BaseLeftSide } from './base-left-side/base-left-side';
import { BaseRightSide } from './base-right-side/base-right-side';

@NgModule({
    declarations: [
        BaseHeader,
        BaseFooter,
        BaseLeftSide,
        BaseRightSide
    ],
    imports: [
        BrowserModule,
        RouterModule
    ],
    exports: [
        BaseHeader,
        BaseFooter,
        BaseLeftSide,
        BaseRightSide
    ],
    providers: []
})
export class BaseComponentsModule {}

