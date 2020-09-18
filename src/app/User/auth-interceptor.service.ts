import { HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service'

@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private userService:UserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let request = req;
        if(request.url !== 'http://localhost:3000/users/login' && request.url !== 'http://localhost:3000/users') {
            request = req.clone({headers: req.headers.append(`Authorization`,`Bearer ${this.userService.user.value.token}`)})
        } else { console.log('Authenticated request.')}
        return next.handle(request);
    }
}