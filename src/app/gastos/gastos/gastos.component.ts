import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Gasto } from 'src/app/model/gasto';
import { formatDate } from '@angular/common';
import { GlobalConstantsService } from 'src/app/shared/global-constants.service';
import * as _ from 'underscore';
import { CategoriaGasto } from 'src/app/model/categoria-gasto';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {


  inicio = this.primeiroDiaMes();
  fim = this.ultimoDiaMes();
  gastos = new Array<Gasto>();
  gasto = new Gasto();

  constructor(private apiService: ApiService, private globalConstants: GlobalConstantsService) {

    this.inicio = this.primeiroDiaMes();
    this.fim = this.ultimoDiaMes();
    this.atualizaGastos(this.primeiroDiaMes(), this.ultimoDiaMes());
  }

  ngOnInit() {

    this.atualizaGastos(this.inicio, this.fim);
  }

  atualizaGastos(dtInicio: string, dtFim: string) {
    this.apiService.listGasto(dtInicio, dtFim).subscribe(
      data => {
        this.gastos = data as unknown as Gasto[];
        this.globalConstants.setTotalGastos(this.somaGastos(this.gastos));
        this.globalConstants.gastos = data as unknown as Gasto[];
        this.globalConstants.atualizaFontesDeRenda(dtInicio, dtFim);
      },
      error => {
        console.log(error);
        alert(error.msg);
      }
    );
  }

  excluir(gasto: Gasto) {
    const resposta = confirm('Deseja realmente excluir o gasto \'' + gasto.nome + '\'');
    if (resposta) {
      this.apiService.excluirGasto(gasto.cod).subscribe(
        data => {
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  
  cancelarPagamento(cod: number, operacao: string){
    this.apiService.pagarGasto(cod).subscribe(
      data => {
        alert('O Gasto ' + data.nome + ' foi cancelado com sucesso!');
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }
  pagamento() {

    if (this.gasto.categoriaGasto.cod === null) {
      this.gasto.categoriaGasto = null;
    }
    this.apiService.editarGasto(this.gasto).subscribe(
      data => {
        alert('O Gasto ' + data.nome + ' foi pago com sucesso!');
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }
  getGasto(cod: any) {
    this.apiService.getGasto(cod).subscribe(
      data => {
        this.gasto = data;
        this.gasto.vencimento = formatDate(data.vencimento, 'yyyy-MM-dd', 'en-US');
        if (this.gasto.dtPagamento) {
          this.gasto.dtPagamento = formatDate(data.dtPagamento, 'yyyy-MM-dd', 'en-US');
        }
        if (data.categoriaGasto === null) {
          this.gasto.categoriaGasto = new CategoriaGasto();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ultimoDiaMes(): string {
    const date = new Date();
    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return formatDate(ultimoDia, 'yyyy-MM-dd', 'en-US','+0430' );
  }

  primeiroDiaMes(): string {
    const date = new Date();
    const primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
    return formatDate(primeiroDia, 'yyyy-MM-dd', 'en-US','+0430');
  }

  somaGastos(gastos: Array<Gasto>): number {
    let totalGastos = 0;
    for (const iterator of gastos) {
      totalGastos += iterator.valor;
    }
    return totalGastos;
  }
  ativaFormCategoriaGasto() {
    if (this.gasto.dtPagamento.search(/([0-9][0-9][0-9][0-9])([ \-])(0?[1-9]|1[012])([ \-])(0?[1-9]|[12][0-9]|3[01])/g) === 0) {
      return false;
    } else {
      return true;
    }
  }

}