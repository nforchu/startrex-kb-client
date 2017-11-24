import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/Router';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule, MatButtonModule, MatSelectModule,
         MatCheckboxModule, MatRadioModule, MatListModule,
         MatMenuModule, MatSidenavModule, MatTabsModule, MatIconModule} from '@angular/material';


import { AppComponent } from './app.component';
import { CoursesComponent } from './console/courses/courses.component';
import { DisplayComponent } from './main/display/display.component';
import { LoginComponent } from './console/login/login.component';
import { CourseComponent } from './console/course/course.component';
import { DashboardComponent } from './console/dashboard/dashboard.component';
import { CourseFormComponent } from './console/course-form/course-form.component';
import { ChapterComponent } from './console/chapter/chapter.component';
import { ChapterFormComponent } from './console/chapter-form/chapter-form.component';
import { CourseContentComponent } from './console/course-content/course-content.component';
import { VideoFormComponent } from './console/video-form/video-form.component';
import { QuestionFormComponent } from './console/question-form/question-form.component';
import { ContentFormComponent } from './console/content-form/content-form.component';
import { NotesFormComponent } from './console/notes-form/notes-form.component';
import { SectionFormComponent } from './console/section-form/section-form.component';
import { HomeComponent } from './console/home/home.component';
import { LoginFormComponent } from './console/login-form/login-form.component';
import { DomainsComponent } from './console/domains/domains.component';
import { HomepageComponent } from './console/homepage/homepage.component';
import { DomainFormComponent } from './console/domain-form/domain-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',       component: LoginFormComponent },
  {path: 'dashboard', component: DashboardComponent,
   children: [
          {path: 'homepage', component: HomepageComponent},
          {path: 'courses', component: CoursesComponent},
          {path: 'domains', component: DomainsComponent},
       ]
  },
  {path: 'domain/:domainId/:domainName', component: DomainFormComponent},
  {path: 'domain/:domainId/:domainName/courses', component: CoursesComponent},
  {path: 'course', component: CourseComponent,
      children: [
         {path: '', component: CourseFormComponent},
         {path: '', component: CourseFormComponent},
         {path: ':id', component: CourseFormComponent},
         {path: ':id/chapter', component: ChapterComponent,
             children: [
                    {path: '', component: ChapterFormComponent},
                    {path: ':new', component: ChapterFormComponent},
                    {path: ':chapterId/:chatperTitle', component: ChapterFormComponent}
             ]
         },
         {path: ':id/:courseTitle', component: CourseFormComponent,
              children: [

              ]},
         {path: ':id/:courseTitle/content', component: CourseContentComponent,
             children: [
                    {path: 'video/:label', component: VideoFormComponent},
                    {path: 'video/:label/:new', component: VideoFormComponent},
                    {path: 'video/:label/get/:videoId', component: VideoFormComponent},
                    {path: 'question/:label', component: QuestionFormComponent},
                    {path: 'question/:label/:new', component: QuestionFormComponent},
                    {path: 'question/:label/get/:questionId', component: QuestionFormComponent},
                    {path: 'notes/:label', component: SectionFormComponent}
             ]}
      ]},
];
@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    DisplayComponent,
    LoginComponent,
    CourseComponent,
    DashboardComponent,
    CourseFormComponent,
    ChapterComponent,
    ChapterFormComponent,
    CourseContentComponent,
    VideoFormComponent,
    QuestionFormComponent,
    ContentFormComponent,
    NotesFormComponent,
    SectionFormComponent,
    HomeComponent,
    LoginFormComponent,
    DomainsComponent,
    HomepageComponent,
    DomainFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    FlexLayoutModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
