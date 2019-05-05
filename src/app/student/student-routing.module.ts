import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentResolver } from './student-resolver';
import { CanDeactivateGuard } from '../shared/can-deactivate-guard';

const studentRoutes: Routes = [
  { path: '', component: StudentComponent, children: [
    { path: '', component: StudentHomeComponent},
    { path: 'new', component: StudentEditComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
    { path: ':id', component: StudentDetailComponent, canActivate: [AuthGuard], resolve: {student: StudentResolver} },
    { path: ':id/edit', component: StudentEditComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard], resolve: {student: StudentResolver} },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(studentRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class StudentRoutingModule {}
