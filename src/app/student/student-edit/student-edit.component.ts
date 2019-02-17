import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from '../student.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StudentService } from '../student.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  form: FormGroup;
  editMode = false;

  constructor(private route: ActivatedRoute, private router: Router, private studentService: StudentService) { }

  ngOnInit() {
    this.editMode = this.studentService.hasLoadedStudent();
    this.initForm();
    this.studentService.addStudentSubject
      .subscribe(
        (id: string) => {
          let student = this.form.value;
          student.id = id;
          console.log(id);
          this.studentService.setSelectedStudent(student);
          this.router.navigate(['/student/detail']);
        }
      );
  }

  onSubmit(){
    let student = this.form.value;
    console.log(student.id);
    if(!this.editMode){
      this.studentService.addStudent(student);
    }else{
      (<Observable<any>>this.studentService.updateStudent(student))
        .subscribe(
            (data: any) => {
              console.log(data);
              this.studentService.setSelectedStudent(student);
              this.router.navigate(['/student/detail']);
            }
        );

    }
  }

  onCancel(){
    if(this.editMode){
      this.router.navigate(['/student/detail']);
    }else{
      this.router.navigate(['/student']);
    }
  }

  private initForm(){
    let id = '';
    let firstname = '';
    let lastname = '';
    let email = '';
    let gender = '';
    let address = '';

    if(this.editMode){
      let student = this.studentService.getSelectedStudent();
      id = student.id;
      firstname = student.firstname;
      lastname = student.lastname;
      email = student.email;
      gender = student.gender;
      address = student.address;
    }
    this.form = new FormGroup({
      'id': new FormControl(id),
      'firstname': new FormControl(firstname, Validators.required),
      'lastname': new FormControl(lastname, Validators.required),
      'email': new FormControl(email, Validators.required),
      'gender': new FormControl(gender, Validators.required),
      'address': new FormControl(address)
    });
  }

}
