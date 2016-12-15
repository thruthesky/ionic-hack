import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JobIndexComponent } from '../pages/job-index/job-index.component';
import { JobListComponent } from "../pages/job-list/job-list.component";
import { JobEditComponent } from "../pages/job-edit/job-edit.component";
import { PhilippineRegion } from '../providers/philippine-region';

import { JobBaseComponentsModule } from '../pages/job-base-components/job.base.components.module';


export let ROUTES = [
        { path: "job", component: JobIndexComponent, name: 'JobIndex' },
        { path: "job/post", component: JobEditComponent, name: 'JobEdit' },
        { path: "job/post/:idx", component: JobEditComponent, name: 'JobEdit' },
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
      RouterModule,
      JobBaseComponentsModule
  ],
  providers: [ PhilippineRegion ]
})
export class JobModule {}
