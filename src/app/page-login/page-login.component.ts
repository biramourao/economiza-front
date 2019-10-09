import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
     this.loginForm = this.formBuilder.group({
    'email' : [null, Validators.required],
    'senha' : [null, [Validators.required, Validators.minLength(4)]]
  });
  }
  login(form: NgForm) {
    this.isLoadingResults = true;
    this.api.login(form)
      .subscribe(res => {
          const email = res['email'];
          const senha = res['senha'];
          this.isLoadingResults = false;
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
