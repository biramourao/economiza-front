import { Injectable, OnInit } from '@angular/core'
import { Gasto } from '../model/gasto';
import { formatDate } from '@angular/common';
import { ApiService } from '../api.service';
import { FonteDeRenda } from '../model/fonte-de-renda';


@Injectable({
  providedIn: 'root'
})
export class GlobalConstantsService {
  totalGastos = 0;
  totalRenda = 0;
  sobra = 0;
  inicio = '';
  fim = '';
  gastos = new Array<Gasto>();
  fontesDeRenda = new Array<FonteDeRenda>();

  constructor(private apiService: ApiService) {
    this.inicio = this.primeiroDiaMes();
    this.fim = this.ultimoDiaMes();
    this.atualizaFontesDeRenda(this.primeiroDiaMes(), this.ultimoDiaMes());
    this.atualizaGastos(this.primeiroDiaMes(), this.ultimoDiaMes());
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

  atualizaGastos(dtInicio: string, dtFim: string) {
    this.apiService.listGasto(dtInicio, dtFim).subscribe(
      data => {
        this.gastos = data as unknown as Gasto[];
        this.totalGastos = this.somaValor(this.gastos);
        this.setSobra();
      },
      error => {
        console.log(error);
        alert(error.msg);
      }
    );
  }

  atualizaFontesDeRenda(dtInicio: string, dtFim: string) {
    this.apiService.listFontesDeRenda(dtInicio, dtFim).subscribe(
      data => {
        this.fontesDeRenda = data as unknown as FonteDeRenda[];
        this.totalRenda = this.somaValor(this.fontesDeRenda);
        this.setSobra();
      },
      error => {
        console.log(error);
      }
    )

  }
  somaValor(vetor: Array<any>): number {
    let totalValor = 0;
    for (const iterator of vetor) {
      totalValor += iterator.valor;
    }
    return totalValor;
  }

  public setTotalGastos(gastos: number) {
    this.totalGastos = gastos;
    this.setSobra();
  }

  public getTotalGastos(): number {
    return this.totalGastos;
  }

  public setTotalRendas(rendas: number) {
    this.totalGastos = rendas;
    this.setSobra();
  }

  public getTotalRendas(): number {
    return this.totalRenda;
  }
  public setSobra() {
    this.sobra = this.totalRenda - this.totalGastos;
  }

  public getSobra(): number {
    return this.totalRenda - this.totalGastos;
  }
  public setGastos(gastos: Gasto[]) {
    this.gastos = gastos;
  }
  public getGastos() {
    return this.gastos;
  }

}
