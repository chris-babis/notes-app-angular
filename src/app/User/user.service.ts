import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  
  user = new BehaviorSubject<User>(null);
  error = new Subject();


  constructor(private http:HttpClient, private router:Router) { }

  registerUser(name: string, email: string, password: string) {
    this.http.post("http://localhost:3000/users", {name, email, password})
    .pipe(tap(userData => this.handleAuthentication(userData)) )
    .subscribe( res => {
       this.router.navigate(['/user']);
    }, err => this.error.next(err.error.message));
  }

  loginUser(email:string,password:string){
    this.http.post("http://localhost:3000/users/login", { email, password})
    .pipe(tap(userData => this.handleAuthentication(userData)))
    .subscribe(res => {
      this.router.navigate(['/user']);
    }, err => this.error.next(err.error.message));
  }

  logoutUser(){
    this.http.post("http://localhost:3000/users/me/logout", this.user.value).subscribe();
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  private handleAuthentication(userData){
    const user = new User(userData.user._id,userData.user.name,userData.token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin(){
    const userData: {_id: string; name: string; token: string} = JSON.parse(localStorage.getItem('userData'));
    if(!userData) return;

    const loggedInUser = new User(userData._id,userData.name,userData.token);
    if(loggedInUser.token) this.user.next(loggedInUser);
  }

}
