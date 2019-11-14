import { Component } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'economiza-api';
  constructor(private tokenStorage: TokenStorageService, private router: Router, private authService: AuthService) {

  }
  logout() {
    this.tokenStorage.signOut();
    alert('Você saiu...')
    this.router.navigate(['/login']);
  }
  isAuth() {
    return this.authService.isAuthenticated();
  }
}
