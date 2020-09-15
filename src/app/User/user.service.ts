import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<User>(null);
  error = new Subject();

  constructor(private http:HttpClient) { }

  registerUser(name: string, email: string, password: string) {
    this.http.post("http://localhost:3000/users", {name, email, password})
    .pipe(tap(userData => this.handleAuthentication(userData)) )
    .subscribe( res => {

    }, err => {this.error.next(err.error.message); console.log(err.error.message)});
  }


  private handleAuthentication(userData){
    const user = new User(userData.user._id,userData.user.name,userData.token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

}
