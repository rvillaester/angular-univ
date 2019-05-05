import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentResolver } from './student-resolver';

const studentRoutes: Routes = [
  { path: '', component: StudentComponent, children: [
    { path: '', component: StudentHomeComponent},
    { path: 'new', component: StudentEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: StudentDetailComponent, canActivate: [AuthGuard], resolve: {student: StudentResolver} },
    { path: ':id/edit', component: StudentEditComponent, canActivate: [AuthGuard], resolve: {student: StudentResolver} },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(studentRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class StudentRoutingModule {}
