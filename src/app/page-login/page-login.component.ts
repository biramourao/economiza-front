import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  loginForm: FormGroup;
  usuario: any; 
  constructor( private api: ApiService) { }
  //constructor(){}
  ngOnInit() {
    this.usuario = {};
  }

  login(fnm: FormGroup) {
    this.api.login(this.usuario).subscribe(resposta =>{
      console.log(resposta);
    });
     
  }
}
