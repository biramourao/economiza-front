import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Gasto } from 'src/app/model/gasto';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { GlobalConstantsService } from 'src/app/shared/global-constants.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  gastos = new Array<Gasto>();
  inicio = this.primeiroDiaMes();
  fim = this.ultimoDiaMes();

  constructor(private apiService: ApiService, private router: Router, private globalConstants: GlobalConstantsService) {
       this.listGastos(this.primeiroDiaMes(), this.ultimoDiaMes());
   }

  ngOnInit() {
 
  }

  listGastos(dtInicio: string, dtFim: string) {
    this.apiService.listGasto(dtInicio, dtFim).subscribe(
      data => {
        this.gastos = data as unknown as Gasto[];
        console.log(data);
        this.somaGastos();
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
  pagamento(cod: any, operacao: string) {
    this.apiService.pagarGasto(cod).subscribe(
      data => {
        console.log('O Gasto ' + data.nome + ' foi ' + operacao + ' com sucesso!');
        alert('O Gasto ' + data.nome + ' foi ' + operacao + ' com sucesso!');
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }
  ultimoDiaMes() {
    const date = new Date();
    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(ultimoDia);
    return formatDate(ultimoDia, 'yyyy-MM-dd', 'en-US', '-03:00');
  }
  primeiroDiaMes() {
    const date = new Date();
    const primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
    console.log(primeiroDia);
    return formatDate(primeiroDia, 'yyyy-MM-dd', 'en-US', '-03:00');
  }
  somaGastos() {
    let totalGastos = 0;
    for (const iterator of this.gastos) {
      totalGastos += iterator.valor;
    }
    this.globalConstants.totalGastos = totalGastos;
  }
}
