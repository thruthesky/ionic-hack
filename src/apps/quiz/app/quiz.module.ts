import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MemberRoutingService } from '../services/user-routing/member-routing.service';
import { QuizBaseModule } from '../pages/quiz-base-components/quiz.base.components.module';



import { DashboardComponent } from '../pages/dashboard/dashboard.component';

import { SubjectComponent } from '../pages/subject/subject.component';
import { ExamhomeComponent } from '../pages/examhome/examhome.component';
import { ResultsComponent } from '../pages/results/results.component';

import { SubjectformComponent } from '../component/subjectform/subjectform.component';

import { QuestionsComponent } from '../pages/questions/questions.component';

import { DataService } from '../services/data-service/data.service';

import { QuestionformComponent } from '../component/questionform/questionform.component';
import { ExampageComponent } from '../pages/exampage/exampage.component';
import { FinalComponent } from '../pages/final/final.component';


export let ROUTES = [
        { path: "quiz", component: DashboardComponent, name: 'home' },
        { path: "dashboard/subject", component: SubjectComponent, name: 'Subjecet' }
];

@NgModule({
  declarations: [
    DashboardComponent,
    SubjectComponent,
    ExamhomeComponent,
    ResultsComponent,
    QuestionsComponent,
    SubjectformComponent,
    QuestionformComponent,
    ExampageComponent,
    FinalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    QuizBaseModule
  ],
  providers: [ DataService, MemberRoutingService ],
  entryComponents:[ QuestionformComponent ],
  exports:[  ]
})
export class QuizModule { }
