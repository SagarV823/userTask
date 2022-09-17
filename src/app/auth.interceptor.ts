import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    if (request.url !== "https://reqres.in/api/login") {
      //this interceptor is adding a token to to every request
      const headers = request.headers.set('authToken', localStorage.getItem('token') + '')
      const updatedRequest = request.clone({ headers });
      console.log('request', request)
      return next.handle(updatedRequest);
    }
    return next.handle(request);
  }
}
