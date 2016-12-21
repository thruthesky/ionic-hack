import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ExamhomeComponent } from '../pages/examhome/examhome.component';
import { SubjectComponent } from '../pages/subject/subject.component';
import { QuestionsComponent } from '../pages/questions/questions.component';


import { ResultsComponent } from '../pages/results/results.component';
import { ExampageComponent } from '../pages/exampage/exampage.component';
import { FinalComponent } from '../pages/final/final.component';

const link: Routes = [

    { path: 'quiz', component : DashboardComponent },
    { path: 'home', component : ExamhomeComponent },
    { path: 'dashboard/subjects', component: SubjectComponent },
    { path: 'dashboard/subjects/questions/:idx', component: QuestionsComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'exam', component: ExampageComponent },
    { path: 'final', component: FinalComponent }
]

@NgModule({
    imports: [ RouterModule.forRoot( link ) ],
    exports: [ RouterModule ]
})

export class RoutesModule {}