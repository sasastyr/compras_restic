import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/shopping-list']);
      },
      (error) => {
        console.error('Erro ao fazer login', error);
      }
    );
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe(
      (response: any) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/shopping-list']);
      },
      (error) => {
        console.error('Erro ao autenticar com o Google', error);
      }
    );
  }
}
