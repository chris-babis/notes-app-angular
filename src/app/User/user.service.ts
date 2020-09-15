import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject<User>(null);

  constructor(private http:HttpClient) { }

  registerUser(name: string, email: string, password: string) {
    console.log(name)
    console.log(email)
    console.log(password)
  }



}
