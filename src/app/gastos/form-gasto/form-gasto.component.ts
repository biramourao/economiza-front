import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Gasto } from 'src/app/model/gasto';
import { ApiService } from 'src/app/api.service';
import { CategoriaGasto } from 'src/app/model/categoria-gasto';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-form-gasto',
  templateUrl: './form-gasto.component.html',
  styleUrls: ['./form-gasto.component.css']
})
export class FormGastoComponent implements OnInit {
  titleForm: string;
  gasto = new Gasto();
  dataVencimentoEdit: string;
  categoriasGasto = new Array<CategoriaGasto>();
  categoriaDeGasto = new CategoriaGasto();
  mostrarCadastroCategoriaDeGasto = false;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.route.params.subscribe(
      res => {
        switch (res.tipo) {
          case 'cadastrar': {
            this.titleForm = 'Cadastrar gasto';
            this.gasto.nome = '';
            this.categoriaDeGasto.descricao = '';
            break;
          }
          case 'editar': {
            if (res.codGasto) {
              this.titleForm = 'Editar gasto';
              this.categoriaDeGasto.descricao = '';
              this.getGasto(res.codGasto);
            } else {
              this.router.navigate(['/not-found']);
            }
            break;
          }
          default: {
            this.router.navigate(['/gastos']);
          }
        }
      }
    );
    this.listCategoriaGasto();
  }

  ngOnInit(

  ) {
  }

  onSubmit() {
    switch (this.titleForm) {
      case 'Cadastrar gasto': {
        this.cadastrarGasto();
        break;
      }
      case 'Editar gasto': {
        this.editarGasto();
        break;
      }
    }
  }

  cadastrarGasto() {

    this.gasto.cod = null;

    if (this.gasto.categoriaGasto === null) {
      this.gasto.categoriaGasto = null;
    }

    this.apiService.cadastrarGasto(this.gasto).subscribe(
      data => {
        console.log('O Gasto ' + data.nome + ' foi cadastrada com sucesso!');
        alert('O Gasto ' + data.nome + ' foi cadastrada com sucesso!');
        this.router.navigate(['/gastos']);
      },
      error => {
        console.log(error);
      }
    );
  }
  editarGasto() {

    if (this.gasto.categoriaGasto.cod === null) {
      this.gasto.categoriaGasto = null;
    }

    this.apiService.editarGasto(this.gasto).subscribe(
      data => {
        console.log('O Gasto ' + data.nome + ' foi editada com sucesso!');
        alert('O Gasto ' + data.nome + ' foi editada com sucesso!');
        this.router.navigate(['/gastos']);

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
        this.router.navigate(['/gastos']);
      }
    );
  }
  listCategoriaGasto() {
    this.apiService.listCategoriaDeGasto().subscribe(
      data => {
        this.categoriasGasto = data as unknown as CategoriaGasto[];
      },
      error => {
        console.log(error);
      }
    )
  }
  cadastrarCategoriaGasto() {
    this.categoriaDeGasto.cod = null;
    this.apiService.cadastrarCategoriaGasto(this.categoriaDeGasto).subscribe(
      data => {
        alert('A Categoria ' + data.descricao + ' foi cadastrada com sucesso!');
        this.listCategoriaGasto();
        this.mostrarCadastroCategoria();
        //$('#CadastroCategoriaDeGastoModal').modal('hide');
      },
      error => {
        console.log(error);
      }
    );
  }
  mostrarCadastroCategoria() {
    if (this.mostrarCadastroCategoriaDeGasto) {
      this.mostrarCadastroCategoriaDeGasto = false;
    } else {
      this.mostrarCadastroCategoriaDeGasto = true;
    }
  }
  ativaForm() {
    if (this.gasto.nome.search(/([a-zA-Z0-9-])/g) === 0 && this.gasto.vencimento.search(/([0-9][0-9][0-9][0-9])([ \-])(0?[1-9]|1[012])([ \-])(0?[1-9]|[12][0-9]|3[01])/g) === 0 && this.gasto.categoriaGasto.cod > 0) {
      return false;

    } else {
      return true;
    }
  }
  ativaFormCategoriaGasto() {
    if (this.categoriaDeGasto.descricao.search(/([a-zA-Z0-9-])/g) === 0) {
      return false;
    } else {
      return true;
    }
  }

}
