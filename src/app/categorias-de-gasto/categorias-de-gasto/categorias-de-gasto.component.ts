import { Component, OnInit } from '@angular/core';
import { CategoriaGasto } from 'src/app/model/categoria-gasto';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias-de-gasto',
  templateUrl: './categorias-de-gasto.component.html',
  styleUrls: ['./categorias-de-gasto.component.css']
})
export class CategoriasDeGastoComponent implements OnInit {

  
  categoriasGasto: CategoriaGasto[];
  key = ''; // Define um valor padrão, para quando inicializar o componente
  reverse = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.categoriasGasto = new Array();
    this.listCategoriaGasto();
  }
  listCategoriaGasto() {
    this.apiService.listCategoriaDeGasto().subscribe(
      data => {
        this.categoriasGasto = data as unknown as CategoriaGasto[];
        console.log(this.categoriasGasto);
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
}
