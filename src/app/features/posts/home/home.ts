import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/auth/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor (private auth: Auth, private router: Router) {
    console.log('Home component initialized');
  }
  
  logout(){
		this.auth.signOut().then(() => {
			this.router.navigate(['login']);
		});
	}
}
