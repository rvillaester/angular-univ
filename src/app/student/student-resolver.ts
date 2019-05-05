import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Student } from "./student.model";
import { Observable } from "rxjs";
import { StudentService } from "./student.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
 })
export class StudentResolver implements Resolve<Student> {

    constructor(private studentService: StudentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Student> | Promise<Student> | Student {
        let id = route.params['id'];
        return this.studentService.searchStudentByIdAsync(id).then (
            (data: any) => {
              if(data.items){
                return data.items[0];
              }
            }
          );
    }
}