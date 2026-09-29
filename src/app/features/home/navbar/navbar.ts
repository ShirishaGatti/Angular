import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
selector: 'app-navbar',
standalone: true,
imports: [RouterLink, NgClass],
templateUrl: './navbar.html',
styleUrl: './navbar.css'
})
export class Navbar {

isLight = false;

// Change this according to your actual authentication logic
isLoggedIn = true;

ngOnInit() {
const savedTheme = localStorage.getItem('fixmycity_theme');

this.isLight = savedTheme === 'light';

this.applyTheme();

}

toggleTheme() {
this.isLight = !this.isLight;

localStorage.setItem(
  'fixmycity_theme',
  this.isLight ? 'light' : 'dark'
);

this.applyTheme();

}

applyTheme() {
document.documentElement.classList.toggle('lm', this.isLight);
}

logout() {
// Later call your logout API/service here

localStorage.removeItem('jwt_token');
localStorage.removeItem('refresh_token');

this.isLoggedIn = false;

}
}
