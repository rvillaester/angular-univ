import { Observable, Subject } from "rxjs";
import { Student } from "./student.model";
import { HttpClient, HttpParams, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";

const SEARCH_STUDENT = 'https://5c2h8ya5re.execute-api.ap-southeast-1.amazonaws.com/dev/search-student';
const UPDATE_STUDENT = 'https://5c2h8ya5re.execute-api.ap-southeast-1.amazonaws.com/dev/update-student';
const DELETE_STUDENT = 'https://5c2h8ya5re.execute-api.ap-southeast-1.amazonaws.com/dev/delete-student';
const ADD_STUDENT = 'https://5c2h8ya5re.execute-api.ap-southeast-1.amazonaws.com/dev/put-student';
const PUT_IMAGE = 'https://8q3sh3itzl.execute-api.ap-southeast-1.amazonaws.com/dev/putToS3';
const GET_IMAGE = 'https://8q3sh3itzl.execute-api.ap-southeast-1.amazonaws.com/dev/getFromS3';

@Injectable()
export class StudentService{

    students: Student[] = [];
    addStudentSubject = new Subject<string>();
    studentsChanged = new Subject<Student[]>();
    studentImageChanged = new Subject<string>();

    constructor(private httpClient: HttpClient){}

    async addStudent(student: Student): Promise<any>{
        return await this.httpClient.post<Student>(ADD_STUDENT, student).toPromise();
    }

    async updateStudent(student: Student): Promise<any>{
        return await this.httpClient.post<Student>(UPDATE_STUDENT, student).toPromise();
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

    async searchStudentByIdAsync(id: string): Promise<any>{
        let params = new HttpParams()
            .set('searchBy', 'id')
            .set('id', id);
        return await this.httpClient.get(SEARCH_STUDENT, {params}).toPromise();

    }

    searchStudentById(id: string){
        let params = new HttpParams()
            .set('searchBy', 'id')
            .set('id', id);
        this.httpClient.get(SEARCH_STUDENT, {params})
            .subscribe(
                (data: any) => {
                    this.students = data.items;
                    this.studentsChanged.next(this.students);
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
                    this.students = data.items;
                    this.studentsChanged.next(this.students);
                }
            );
    }

    uploadAvatar(id: string, base64EncodedImage: string){
        let data = {
            "data": base64EncodedImage
        };
        let params = new HttpParams().set('key', id);
        this.httpClient.post<any>(PUT_IMAGE, data, 
            {
                params: params
            }).subscribe(
                (response: any) => {
                    console.log(response);
                }
            );
    }

    getAvatar(id: string) {
        let params = new HttpParams().set('key', id);
        this.httpClient.get<any>(GET_IMAGE, {params}).subscribe(
            (result: any) => {
                this.studentImageChanged.next(result.Body.data);
            },
            (error: any) => {
                console.log(error);
            }
        );
    }
}