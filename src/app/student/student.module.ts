import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentService } from './student.service';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentResolver } from './student-resolver';

@NgModule({
  declarations: [
    StudentComponent,
    StudentDetailComponent,
    StudentEditComponent,
    StudentHomeComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StudentRoutingModule,
    SharedModule
  ],
  providers: [
    StudentService, StudentResolver
  ]
})
export class StudentModule {}