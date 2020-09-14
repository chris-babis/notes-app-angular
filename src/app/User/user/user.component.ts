import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  error;
  pageMode;
  header;
  btnText;

  userForm:FormGroup;
  
  hide = true;

  constructor(private router:Router) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', [Validators.required])
    })

    this.pageMode = this.router.url === '/login' ? 'login' : 'register';
    this.header = this.btnText = this.pageMode === "login" ? "Login" : "Register";
  }

  onSubmit(form: NgForm) {
    
  }


}
