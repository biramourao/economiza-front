import { Injectable, OnInit } from '@angular/core'
import { Gasto } from '../model/gasto';


@Injectable({
  providedIn: 'root'
})
export class GlobalConstantsService {
  totalGastos = 0;
  totalRenda = 5000;
  sobra = 0;
  gastos = new Array<Gasto>();

  constructor() {
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
  public setSobra(sobra: number) {
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
