import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Post } from '../../../api/philgo-api/v2/post';
import { JobIndexComponent } from '../pages/job-index/job-index.component';
import { JobListComponent } from "../pages/job-list/job-list.component";
import { JobEditComponent } from "../pages/job-edit/job-edit.component";
import { Location } from '../providers/location';
export let ROUTES = [
        { path: "job", component: JobIndexComponent, name: 'JobIndex' },
        { path: "job/post", component: JobEditComponent, name: 'JobEdit' },
        { path: "job/list", component: JobListComponent, name: 'JobList' }
];
@NgModule({
  declarations: [
      JobIndexComponent,
      JobListComponent,
      JobEditComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      RouterModule
  ],
  providers: [ Post, Location ]
})
export class JobModule {}
