
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { LanguagePipeModule } from '../../../../pipes/language/language.pipe.module';

import { JobBaseHeader } from './job-base-header/job-base-header';
import { JobBaseFooter } from './job-base-footer/job-base-footer';
import { JobBaseLeftSide } from './job-base-left-side/job-base-left-side';
import { JobBaseRightSide } from './job-base-right-side/job-base-right-side';

@NgModule({
    declarations: [
        JobBaseHeader,
        JobBaseFooter,
        JobBaseLeftSide,
        JobBaseRightSide
    ],
    imports: [
        BrowserModule,
        RouterModule,
        LanguagePipeModule
    ],
    exports: [
        JobBaseHeader,
        JobBaseFooter,
        JobBaseLeftSide,
        JobBaseRightSide
    ],
    providers: []
})
export class JobBaseComponentsModule {}

