import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Gasto } from 'src/app/model/gasto';
import { FonteDeRenda } from 'src/app/model/fonte-de-renda';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  public totalGastos = 0;
  public totalRenda = 0;
  public sobra = 0;
  constructor(private apiService: ApiService) { }

  ngOnInit(
  ) {
    this.somaGastos();
    this.somaRendas();

  }
  somaGastos() {
    this.apiService.listGasto().subscribe(
      data => {
        const gastos = data as unknown as Gasto[];
        if (gastos.length > 0) {
          for (const gasto of gastos) {
            this.totalGastos += gasto.valor;
          }
          this.calculaSobra();
        }
      },
      error => {
        console.log(error);
        alert(error.msg);
      }
    );
  }
  somaRendas() {
    this.apiService.listFontesDeRenda().subscribe(
      data => {
        const rendas = data as unknown as FonteDeRenda[];
        if (rendas.length > 0) {
          for (const renda of rendas) {
            this.totalRenda += renda.valor;
          }
          this.calculaSobra();
        }
      },
      error => {
        console.log(error);
        alert(error.msg);
      }
    );
  }
  calculaSobra() {
    this.sobra = this.totalRenda - this.totalGastos;
  }
}
