import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
  token=localStorage.getItem("token");

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwttoken=request.clone({
        setHeaders:{
          Authorization:'Bearer ' + this.token // Ajoutez un espace après 'Bearer' donc 'Bearer '
        }
    })
    return next.handle(jwttoken);
  }
}
