import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-detalhe-cadastro',
  templateUrl: './detalhe-cadastro.component.html',
  styleUrls: ['./detalhe-cadastro.component.css']
})
export class DetalheCadastroComponent implements OnInit {
  usuario: Usuario;
  naoEditavel = true;
  constructor(private apiService: ApiService, private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit() {
    this.getUsuario();
    this.naoEditavel = true;
  }
  getUsuario() {
    this.apiService.getUsuario().subscribe(
      data => {
        this.usuario = data as unknown as Usuario;
      },
      error => {
        console.log(error);
      }
    );
  }
  editarUsuario() {
    this.apiService.editarUsuario(this.usuario).subscribe(
      data => {
        const decisao = confirm('O Usuario ' + data.nome + ' foi editada com sucesso!');
        this.logout();
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteUsuario() {
    const decisao = confirm('Você deseja excluir o seu usuário?\n Todos os seus dados serão excluidos permanentemente!');
    if (decisao) {
      this.apiService.deleteUsuario(this.usuario.cod).subscribe(
        data => {
          alert("O usuário, e seus dados foram excluidos com sucesso!")
          this.logout();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  logout() {
    this.tokenStorageService.signOut();
    alert('Você foi desconectado, faça login novamente para revalidar o dados!')
    this.router.navigate(['/login']);
  }
  habilitaEdicao() {
    if (this.naoEditavel) {
      this.naoEditavel = false;
    }else{
      this.naoEditavel = true;
    }
  }

}
