import { Observable, Subject } from "rxjs";
import { Student } from "./student.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

const SEARCH_STUDENT = 'https://5c2h8ya5re.execute-api.ap-southeast-1.amazonaws.com/dev/search-student';
const UPDATE_STUDENT = 'https://5c2h8ya5re.execute-api.ap-southeast-1.amazonaws.com/dev/update-student';
const DELETE_STUDENT = 'https://5c2h8ya5re.execute-api.ap-southeast-1.amazonaws.com/dev/delete-student';
const ADD_STUDENT = 'https://5c2h8ya5re.execute-api.ap-southeast-1.amazonaws.com/dev/put-student';

@Injectable()
export class StudentService{

    private selectedStudent: Student;
    students: Student[] = [];
    addStudentSubject = new Subject<string>();
    studentsChanged = new Subject<Student[]>();

    constructor(private httpClient: HttpClient){}

    addStudent(student: Student){
        this.httpClient.post<Student>(ADD_STUDENT, student)
            .subscribe(
                (data: any) => {
                    this.addStudentSubject.next(data.id);
                }
            );
    }

    updateStudent(student: Student): Observable<any> | Promise<any>{
        return this.httpClient.post<Student>(UPDATE_STUDENT, student);
    }

    deleteStudent(index: number, student: Student){
        this.httpClient.post<Student>(DELETE_STUDENT, student)
            .subscribe(
                (data: any) => {
                    this.students.splice(index, 1);
                    this.studentsChanged.next(this.students.slice());
                }
            );
    }

    searchStudentById(id: string){
        let params = new HttpParams()
            .set('searchBy', 'id')
            .set('id', id);
        this.httpClient.get(SEARCH_STUDENT, {params})
            .subscribe(
                (data: any) => {
                    this.processResults(data);
                }
            );
    }

    searchStudentByName(firstname: string, lastname: string){
        let params = new HttpParams()
            .set('searchBy', 'name')
            .set('firstname', firstname)
            .set('lastname', lastname);
        this.httpClient.get(SEARCH_STUDENT, {params})
            .subscribe(
                (data: any) => {
                    this.processResults(data);
                }
            );
    }

    private processResults(data){
        this.students = data.items;
        this.studentsChanged.next(this.students);
    }

    hasLoadedStudent(){
        return this.selectedStudent !== null;
    }

    clearSelectedStudent(){
        this.selectedStudent = null;
    }

    setSelectedStudent(student: Student){
        this.selectedStudent = student;
    }

    getSelectedStudent(){
        return this.selectedStudent;
    }
}