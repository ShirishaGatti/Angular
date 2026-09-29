import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
@Component({
  imports: [RouterLink, Navbar, Footer],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

  title = 'FixMyCity';
}
