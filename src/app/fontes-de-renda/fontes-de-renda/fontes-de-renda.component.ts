import { Component, OnInit } from '@angular/core';
import { FonteDeRenda } from 'src/app/model/fonte-de-renda';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { GlobalConstantsService } from 'src/app/shared/global-constants.service';

@Component({
  selector: 'app-fontes-de-renda',
  templateUrl: './fontes-de-renda.component.html',
  styleUrls: ['./fontes-de-renda.component.css']
})
export class FontesDeRendaComponent implements OnInit {

fontesDeRenda: FonteDeRenda[];
  key = ''; // Define um valor padrão, para quando inicializar o componente
  reverse = false;
  inicio = '';
  fim = '';

  constructor(private apiService: ApiService, private router: Router, private globalConstantsService : GlobalConstantsService) { }

  ngOnInit() {
    this.inicio = this.primeiroDiaMes();
    this.fim = this.ultimoDiaMes();
    this.fontesDeRenda = new Array();
    this.atualizaFontesDeRenda(this.primeiroDiaMes(), this.ultimoDiaMes());
  }

  atualizaFontesDeRenda(dtInicio: string, dtFim: string) {
    this.apiService.listFontesDeRenda(dtInicio, dtFim).subscribe(
      data => {
        this.fontesDeRenda = data as unknown as FonteDeRenda[];
        this.globalConstantsService.atualizaFontesDeRenda(dtInicio, dtFim);
        console.log(this.fontesDeRenda);
      },
      error => {
        console.log(error);
      }
    )

  }
  excluir(fonteDeRenda: FonteDeRenda) {
    const resposta = confirm('Deseja realmente excluir a fonte de Renda \'' + fonteDeRenda.descricao + '\'');
    if (resposta) {
      this.apiService.excluirFonteDeRenda(fonteDeRenda.cod).subscribe(
        data => {
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      )
    }
  }
  ultimoDiaMes(): string {
    const date = new Date();
    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return formatDate(ultimoDia, 'yyyy-MM-dd', 'en-US', '-03:00');
  }

  primeiroDiaMes(): string {
    const date = new Date();
    const primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
    return formatDate(primeiroDia, 'yyyy-MM-dd', 'en-US', '-03:00');
  }

}
