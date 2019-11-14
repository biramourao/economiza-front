import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Gasto } from 'src/app/model/gasto';
import { Router } from '@angular/router';
import { FormGastoComponent } from '../form-gasto/form-gasto.component';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  gastos = new Array<Gasto>();

  constructor(private apiService: ApiService, private router: Router, private formGasto: FormGastoComponent) { }

  ngOnInit() {
    this.listGastos();
  }

  listGastos() {
    this.apiService.listGasto().subscribe(
      data => {
        this.gastos = data as unknown as Gasto[];
        console.log(data);
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
}
