import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  idSelected = false;
  nameSelected = false;

  constructor() { }

  ngOnInit() {
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

}
