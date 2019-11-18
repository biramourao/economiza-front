import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { CategoriaGasto } from 'src/app/model/categoria-gasto'

@Component({
  selector: 'app-form-categoria-de-gasto',
  templateUrl: './form-categoria-de-gasto.component.html',
  styleUrls: ['./form-categoria-de-gasto.component.css']
})
export class FormCategoriaDeGastoComponent implements OnInit {
  titleForm: string;
  categoriaDeGasto = new CategoriaGasto();

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.route.params.subscribe(
      res => {
        switch (res.tipo) {
          case 'cadastrar': {
            this.titleForm = 'Cadastrar categoria de gasto';
            break;
          }
          case 'editar': {
            if (res.codCategoriaGasto) {
              this.titleForm = 'Editar categoria de gasto';
              this.getCategoriaGasto(res.codCategoriaGasto);
            } else {
              this.router.navigate(['/not-found']);
            }
            break;
          }
          default: {
            this.router.navigate(['/categorias-de-gasto']);
          }
        }
      }
    );
  }

  ngOnInit(

  ) {
  }

  onSubmit() {
    switch (this.titleForm) {
      case 'Cadastrar': {
        this.cadastrarCategoriaGasto();
        break;
      }
      case 'Editar': {
        this.editarCategoriaGasto();
        break;
      }
    }
  }

  cadastrarCategoriaGasto() {
    this.categoriaDeGasto.cod = null;

    this.apiService.cadastrarCategoriaGasto(this.categoriaDeGasto).subscribe(
      data => {
        alert('A Categoria ' + data.descricao + ' foi cadastrada com sucesso!');
        this.router.navigate(['/categorias-de-gasto']);
      },
      error => {
        console.log(error);
      }
    );
  }
  editarCategoriaGasto() {

    this.apiService.editarCategoriaGasto(this.categoriaDeGasto).subscribe(
      data => {
        alert('A Categoria ' + data.descricao + ' foi editada com sucesso!');
        this.router.navigate(['/categorias-de-gasto']);

      },
      error => {
        console.log(error);
      }
    );
  }
  getCategoriaGasto(cod: any) {
    this.apiService.getCategoriaGasto(cod).subscribe(
      data => {
        this.categoriaDeGasto = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
