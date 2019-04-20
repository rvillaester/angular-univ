import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  student: Student;
  id: string;

  constructor(private route: ActivatedRoute, private router: Router, private studentService: StudentService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    var prom = this.studentService.searchStudentByIdAsync(this.id);
    prom.then (
      (data: any) => {
        if(data.items){
          this.student = data.items[0];
          this.student.base64EncodedAvatar = 'http://www.prairieskychamber.ca/wp-content/uploads/2016/10/person-placeholder-image-3.jpg';
        }
      }
    );

    this.studentService.getAvatar(this.id);
    this.studentService.studentImageChanged
      .subscribe(
        (data: string) => {
          this.student.base64EncodedAvatar = this.sanitizeImage(this.encode(data));
        }
      )
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
    var base64EncodedString = btoa(binaryString)
    this.student.base64EncodedAvatar = this.sanitizeImage(base64EncodedString);
    this.studentService.uploadAvatar(this.id, base64EncodedString);
  }

  encode(data): string{
    var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
  }

  sanitizeImage(base64EncodedString){
    return this.sanitizer.bypassSecurityTrustUrl("data:Image/*;base64," + base64EncodedString);
  }
}
