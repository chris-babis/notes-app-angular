import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  error;
  errorSubscription: Subscription;

  pageMode;
  header;
  btnText;

  userForm:FormGroup;
  
  hide = true;
  confirmHide = true;

  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {

    this.errorSubscription = this.userService.error.subscribe(err => this.error = err);

    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),

    })

    this.pageMode = this.router.url === '/login' ? 'login' : 'register';
    this.header = this.btnText = this.pageMode === "login" ? "Login" : "Register";

    if(this.pageMode === 'register') {
      this.userForm.addControl('confirmPassword', new FormControl('', this.checkPasswords.bind(this)));
      this.userForm.addControl('name', new FormControl('', [Validators.required]));
    }
  }

  onSubmit() {
     this.pageMode === 'register' ? this.userService.registerUser(this.userForm.get('name').value,this.userForm.get('email').value,this.userForm.get('password').value) 
                                  : this.userService.loginUser(this.userForm.get('email').value,this.userForm.get('password').value)
  }

  checkPasswords(): {[s: string]: boolean} {
    if(this.userForm.get('password')?.value !== this.userForm.get('confirmPassword')?.value) return {'same': true};
    return null;
  }


}
