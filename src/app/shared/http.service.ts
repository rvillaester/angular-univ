import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Student } from "../student/student.model";
import { StudentSearchCriteria } from "../student/student.search-criteria.model";

const AUTHENTICATED_API = 'https://5c2h8ya5re.execute-api.ap-southeast-1.amazonaws.com/dev/authenticated-api';
const UNAUTHENTICATED_API = 'https://5c2h8ya5re.execute-api.ap-southeast-1.amazonaws.com/dev/unauthenticated-api';

@Injectable()
export class HttpService{

    constructor(private httpClient: HttpClient){}

    testAuthenticatedApi(){
        this.httpClient.get(AUTHENTICATED_API)
            .subscribe(
                (data: any) => {
                    console.log(data);
                }
            );
    }
    
    testUnauthenticatedApi(){
        this.httpClient.get(UNAUTHENTICATED_API)
            .subscribe(
                (data: any) => {
                    console.log(data);
                }
            );
    }
}