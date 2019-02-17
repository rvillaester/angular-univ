import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { FacultyComponent } from './faculty/faculty.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'student', loadChildren: './student/student.module#StudentModule'},
  { path: 'faculty', component: FacultyComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
