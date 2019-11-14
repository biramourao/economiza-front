import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.tokenStorage.signOut();
    alert('Você saiu...')
    this.router.navigate(['/login']);
  }

}
