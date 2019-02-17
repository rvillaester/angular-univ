import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercepted');
        const token = this.authService.getIdToken();
        let requestItem = request;
        if (token) {
            // const headers = new HttpHeaders({
            //     'Authorization': token,
            //     'Access-Control-Allow-Origin': '*'
            // });
            requestItem = request.clone({
                // headers: headers
                headers: request.headers.set("Authorization", token)
            });
        }
        return next.handle(requestItem).pipe(
            tap((event: HttpEvent<any>) => {
                console.log(event);
                if (event instanceof HttpResponse) {
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    // console.log(err);
                    if (err.status === 401) {
                    }
                }
            })
        );
    }
}
