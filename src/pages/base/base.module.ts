import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { LanguagePipeModule } from '../../pipes/language/language.pipe.module';
import { BaseComponentsModule } from '../base-components/base.components.module';

import { FirebaseApiModule } from '../../api/firebase-api/firebase-api-module';

import { HomePage } from './home/home';
import { HelpPage } from './help/help';
import { AboutPage } from './about/about';
import { RegisterPage } from './user/register/register';
import { LoginPage } from './user/login/login';
import { ProfilePage } from './user/profile/profile';
import { FileNotFoundPage } from './file-not-found/file-not-found';

export let ROUTES: Routes = [
  { path: 'help', component: HelpPage },
  { path: 'user/register', component: RegisterPage },
  { path: 'user/login', component: LoginPage },
  { path: 'user/profile', component: ProfilePage },
  { path: 'about', component: AboutPage },
  { path: '', component: HomePage },
  { path: '**', component: FileNotFoundPage }
];

@NgModule({
    declarations: [
        HomePage,
        HelpPage,
        AboutPage,
        RegisterPage,
        LoginPage,
        ProfilePage,
        FileNotFoundPage
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        FirebaseApiModule,
        LanguagePipeModule,
        BaseComponentsModule
    ],
    providers: []
})
export class BaseModule {}
