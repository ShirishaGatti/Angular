import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  imports: [FormsModule],
  selector: 'app-auth',
  styleUrl: './auth.css',
  templateUrl: './auth.html',
})
export class Auth {

  title='FixMyCity Login'

  user = {
    userName: '',
    password: ''
  };  

  sysUserData={
    userName: 'Shirisha',
    password: '1234'
  }
  constructor(private router: Router) {}

  login() {
    // Login logic here
    if (this.user.userName === this.sysUserData.userName && this.user.password === this.sysUserData.password) {
      alert('Login successful!');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid username or password.');
    }
  }

}
