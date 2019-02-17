import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { StudentService } from '../student.service';
import { Observable } from 'rxjs';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
@Injectable()
export class StudentHomeComponent implements OnInit {

  idSelected = false;
  nameSelected = false;
  students: Student[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.studentsChanged
      .subscribe(
        (students: Student[]) => {
          this.students = students;
        }
      );
  }

  onSearchCategorySelect(category: string){
    this.idSelected = false;
    this.nameSelected = false;
    if(category == 'id'){
      this.idSelected = true;
    }else if(category == 'name'){
      this.nameSelected = true;
    }
  }

  onAddStudent(){
    this.studentService.clearSelectedStudent();
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  isEmpty(){
    return this.students.length === 0;
  }

  onSearchStudent(form: NgForm){
    this.students = [];
    if(this.idSelected){
      let id = form.value.id;
      if(!id){
        alert('Please enter ID');
      }else{
        this.studentService.searchStudentById(id);
      }
    }else if(this.nameSelected){
      let firstname = form.value.firstname;
      let lastname = form.value.lastname;
      if(!firstname && !lastname){
        alert('Please enter either firstname or lastname');
      }else{
        this.studentService.searchStudentByName(firstname, lastname);
      }
    }
  }
}
