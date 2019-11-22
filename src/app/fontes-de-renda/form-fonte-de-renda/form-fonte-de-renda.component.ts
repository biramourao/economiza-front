import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FonteDeRenda } from 'src/app/model/fonte-de-renda';
import { formatDate } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-fonte-de-renda',
  templateUrl: './form-fonte-de-renda.component.html',
  styleUrls: ['./form-fonte-de-renda.component.css']
})
export class FormFonteDeRendaComponent implements OnInit {

  createForm: FormGroup;
  titleForm: string;
  fonteDeRenda = new FonteDeRenda();

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.route.params.subscribe(
      res => {
        switch (res.tipo) {
          case 'cadastrar': {
            this.titleForm = 'Cadastrar fonte de renda';
            this.fonteDeRenda.descricao = '';
            break;
          }
          case 'editar': {
            if (res.codFonteDeRenda) {
              this.titleForm = 'Editar fonte de renda';
              this.getFonteDeRenda(res.codFonteDeRenda);
            } else {
              this.router.navigate(['/not-found']);
            }
            break;
          }
          default: {
            this.router.navigate(['/gastos']);
          }
        }
      }
    );
  }

  ngOnInit(

  ) {
  }

  onSubmit() {
    switch (this.titleForm) {
      case 'Cadastrar fonte de renda': {
        this.cadastrarFonteDeRenda();
        break;
      }
      case 'Editar fonte de renda': {
        this.editarFonteDeRenda();
        break;
      }
    }
  }

  cadastrarFonteDeRenda() {

    this.fonteDeRenda.cod = null;

    this.apiService.cadastrarFonteDeRenda(this.fonteDeRenda).subscribe(
      data => {
        alert('A Fonte de Renda ' + data.descricao + ' foi cadastrada com sucesso!');
        this.router.navigate(['/fontes-de-renda']);
      },
      error => {
        console.log(error);
      }
    );
  }
  editarFonteDeRenda() {

    this.apiService.editarFonteDeRenda(this.fonteDeRenda).subscribe(
      data => {
        alert('A Fonte de Renda ' + data.descricao + ' foi editada com sucesso!');
        this.router.navigate(['/fontes-de-renda']);
      },
      error => {
        console.log(error);
      }
    );
  }
  getFonteDeRenda(cod: any) {
    this.apiService.getFonteDeRenda(cod).subscribe(
      data => {
        this.fonteDeRenda = data;
        this.fonteDeRenda.dtValidade = formatDate(data.dtValidade, 'yyyy-MM-dd', 'en-US', '-03:00')
      },
      error => {
        console.log(error);
        this.router.navigate(['/fontes-de-renda']);
      }
    );
  }
  ativaForm() {
    if (this.fonteDeRenda.descricao.search(/([a-zA-Z0-9-])/g) === 0 && this.fonteDeRenda.dtValidade.search(/([0-9][0-9][0-9][0-9])([ \-])(0?[1-9]|1[012])([ \-])(0?[1-9]|[12][0-9]|3[01])/g) === 0 && this.fonteDeRenda.valor > 0) {
      return false;
    } else {
      return true;
    }
  }
}
