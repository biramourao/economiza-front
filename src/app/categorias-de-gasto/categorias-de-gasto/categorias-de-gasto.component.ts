import { Component, OnInit } from '@angular/core';
import { CategoriaGasto } from 'src/app/model/categoria-gasto';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-categorias-de-gasto',
  templateUrl: './categorias-de-gasto.component.html',
  styleUrls: ['./categorias-de-gasto.component.css']
})
export class CategoriasDeGastoComponent implements OnInit {

  categoriasGasto: CategoriaGasto[];
  key = ''; // Define um valor padrão, para quando inicializar o componente
  reverse = false;
  sortedData = new Array<CategoriaGasto>();

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.categoriasGasto = new Array();
    this.listCategoriaGasto();
  }
  listCategoriaGasto() {
    this.apiService.listCategoriaDeGasto().subscribe(
      data => {
        this.categoriasGasto = data as unknown as CategoriaGasto[];
        this.sortedData = this.categoriasGasto.slice();
        let defSort: Sort = {direction: 'asc', active: 'Descricao'};
        defSort.direction = 'asc';
        defSort.active = 'Descricao';
        this.sortData(defSort);
      },
      error => {
        console.log(error);
      }
    )

  }
  excluir(categoriaGasto: CategoriaGasto) {
    const resposta = confirm('Deseja realmente excluir a categoria \'' + categoriaGasto.descricao + '\'');
    if (resposta) {
      this.apiService.excluirCategoriaGasto(categoriaGasto.cod).subscribe(
        data => {
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      )
    }
  }
//teste
sortData(sort: Sort) {
    const data = this.categoriasGasto.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Descricao': return compare(a.descricao, b.descricao, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
