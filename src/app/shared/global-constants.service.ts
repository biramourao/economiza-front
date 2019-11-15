import { Injectable, OnInit } from '@angular/core'


@Injectable({
  providedIn: 'root'
})
export class GlobalConstantsService {
  totalGastos = 0;
  totalRenda = 0;
  sobra = 0;

  constructor() {
  }

  public setTotalGastos(gastos: number) {
    this.totalGastos = gastos;
  }

  public getTotalGastos(): number {
    return this.totalGastos;
  }

  public setTotalRendas(rendas: number) {
    this.totalGastos = rendas;
  }

  public getTotalRendas(): number {
    return this.totalRenda;
  }
  public setSobra(sobra: number) {
    this.sobra = sobra;
  }

  public getSobra(): number {
    return this.sobra;
  }

}
