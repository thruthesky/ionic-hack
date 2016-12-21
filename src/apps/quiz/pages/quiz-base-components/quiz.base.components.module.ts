import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { QuizBaseNavComponent } from '../../pages/quiz-base-components/quiz-base-nav/quiz-base-nav';


@NgModule({
  declarations: [
      QuizBaseNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  providers: [ ],
  entryComponents:[  ],
  exports:[ QuizBaseNavComponent ]
})
export class QuizBaseModule { }
