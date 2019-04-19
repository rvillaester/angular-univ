import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  student: Student;
  id: string;

  constructor(private route: ActivatedRoute, private router: Router, private studentService: StudentService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    var prom = this.studentService.searchStudentByIdAsync(this.id);
    prom.then (
      (data: any) => {
        if(data.items){
          this.student = data.items[0];
        }
      }
    );
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate(['/student']);
  }

  onImageChange(event: any){
    var file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(event){
    var binaryString = event.target.result;
    this.student.base64EncodedAvatar = btoa(binaryString);
  }
}
