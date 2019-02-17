import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from 'src/app/shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){
    const username = form.value.username;
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const confPassword = form.value.confPassword;
    if(password !== confPassword){
      alert('Password don\'t match');
    } else if(password.length < 6) {
      alert('Password should be at least 6 characters in lenght');
    } else {
      let user = new User(name, email, username);
      this.authService.signup(user, password);
    }
  }

  onCancel(){
    this.router.navigate(["/"]);
  }

}
