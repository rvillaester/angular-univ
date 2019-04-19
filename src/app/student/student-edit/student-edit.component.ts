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
  id: string;

  constructor(private route: ActivatedRoute, private router: Router, private studentService: StudentService) { }

  ngOnInit() {
    this.editMode = false;
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.editMode = true;
    }
    this.initForm();
  }

  onSubmit(){
    let student = this.form.value;
    console.log(this.form.get('firstname'));
    if(!this.editMode){
      this.studentService.addStudent(student)
        .then(
            (data: any) => {
              this.router.navigate(['student', data.id]);
            }
        );
    }else{
      this.studentService.updateStudent(student)
        .then(
            (data: any) => {
              this.router.navigate(['student', student.id]);
            }
        );
    }
  }

  onCancel(){
    if(this.editMode){
      this.router.navigate(['student', this.id]);
    }else{
      this.router.navigate(['student']);
    }
  }

  private initForm(){
    if(this.editMode){
      var prom = this.studentService.searchStudentByIdAsync(this.id);
      prom.then (
        (data: any) => {
          if(data.items){
            var student = data.items[0];
            this.createForm(student.id, student.firstname, student.lastname, student.email, student.gender, student.address);
          }
        }
      );
    } else{
      this.createForm('', '', '', '', '', '');
    }
  }

  private createForm(id, firstname, lastname, email, gender, address){
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
