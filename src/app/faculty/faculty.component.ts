import { Component, OnInit } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }
  
  onAuthenticatedApi(){
    this.httpService.testAuthenticatedApi();
  }

  onUnauthenticatedApi(){
    this.httpService.testUnauthenticatedApi();
  }

}
