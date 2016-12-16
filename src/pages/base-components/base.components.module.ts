
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { LanguagePipeModule } from '../../pipes/language/language.pipe.module';
import { PhilgoApiModule } from '../../api/philgo-api/v2/philgo-api-module';

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
        RouterModule,
        LanguagePipeModule,
        PhilgoApiModule
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

