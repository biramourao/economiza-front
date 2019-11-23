import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from 'src/app/auth/sign-up-info';
import { AuthService } from 'src/app/auth/auth-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';
import { AuthLoginInfo } from 'src/app/auth/auth-login-info';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  usuario = new SignUpInfo('', '', '');
  authLoginInfo: AuthLoginInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  confirmSenha = '';
  mensagemErroSenha = '';
  classe = 'is-invalid';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      console.log(this.tokenStorage.getToken());
      this.router.navigate(['/gastos']);
    }
  }

  cadastrarUsuario() {

    this.authService.signUp(this.usuario).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.authLoginInfo = new AuthLoginInfo(this.usuario.email, this.usuario.senha);
        this.authService.attemptAuth(this.authLoginInfo).subscribe(
          data => {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUsername(data.username);
            this.tokenStorage.saveAuthorities(data.authorities);
            window.location.reload();
            console.log(data);
          },
          error => {
            console.log(error);
            this.errorMessage = error.error.message;
            alert(error.msg);
          });
      },
      error => {
        this.isSignUpFailed = true;
      }
    );
  }
  validacao() {
    if (this.usuario.email !== '' && this.usuario.nome !== ''
      && this.usuario.email.search(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) === 0
      && this.confirmaSenha()) {
      return false;
    } else {
      return true;
    }
  }
  confirmaSenha() {
    if (this.usuario.senha !== '') {
      if (this.usuario.senha === this.confirmSenha) {
        this.classe = 'is-valid';
        return true;
      } else {
        this.mensagemErroSenha = 'As senhas não conferem!'
        this.classe = 'is-invalid';
        return false;
      }
    } else {
      this.mensagemErroSenha = 'Digite uma senha!'
      this.classe = 'is-invalid';
      return false;
    }
  }
}
