import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { QuizBaseNavComponent } from '../../pages/quiz-base-components/quiz-base-nav/quiz-base-nav';
import { QuizBaseFooter } from './quiz-base-footer/quiz-base-footer'


@NgModule({
  declarations: [
      QuizBaseNavComponent,
      QuizBaseFooter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  providers: [ ],
  entryComponents:[  ],
  exports:[ QuizBaseNavComponent, QuizBaseFooter ]
})
export class QuizBaseModule { }
