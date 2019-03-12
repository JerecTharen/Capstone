import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.authed().subscribe(
      res => {
        if (res) this.router.navigate(['/']);
      }
    );
  }

  signIn() {
    this.auth.signIn();
  }

}
