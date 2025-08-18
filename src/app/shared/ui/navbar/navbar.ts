import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private auth: Auth, private router: Router) {}


  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
    
    this.checkAuthStatus();
  }
  
  async checkAuthStatus() {
    try {
      const isAuthenticated = await this.auth.isAuthenticated();
      if (isAuthenticated) {
        const user = await this.auth.getUser();
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      this.isLoggedIn = false;
    }
  }

  
  logout(){
    this.auth.signOut().then(() => {
      this.router.navigate(['login']);
		});
	}
  
  
}
