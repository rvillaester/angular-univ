import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html'
  // styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  @Input('students') students: Student[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.studentsChanged
      .subscribe(
        (students: Student[]) => {
          this.students = students;
        }
      );
  }
  
  onViewDetails(student: Student){
    this.router.navigate([student.id], {relativeTo: this.route});
  }

  onDelete(index: number, student: Student){
    this.studentService.deleteStudent(index, student);
  }

}
