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
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.route.params.subscribe(
      res => {
        switch (res.tipo) {
          case 'cadastrar': {
            this.titleForm = 'Cadastrar';
            break;
          }
          case 'editar': {
            if (res.codGasto) {
              this.titleForm = 'Editar';
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
      case 'Cadastrar': {
        this.cadastrarGasto();
        break;
      }
      case 'Editar': {
        this.editarGasto();
        break;
      }
    }
  }

  cadastrarGasto() {
    this.gasto.cod = null;
    this.apiService.cadastrarGasto(this.gasto).subscribe(
      data => {
        console.log('O Gasto ' + data.nome + ' foi cadastrada com sucesso!');
        const decisao = confirm('O Gasto ' + data.nome + ' foi cadastrada com sucesso!\n Deseja realizar novo cadastro?');
        if (!decisao) {
          this.router.navigate(['/gastos']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  editarGasto() {
    this.apiService.editarGasto(this.gasto).subscribe(
      data => {
        console.log('O Gasto ' + data.nome + ' foi editada com sucesso!');
        const decisao = confirm('O Gasto ' + data.nome + ' foi editada com sucesso!\n Deseja realizar novo cadastro?');
        if (!decisao) {
          this.router.navigate(['/gastos']);
        }
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
        this.gasto.vencimento = formatDate(data.vencimento, 'yyyy-MM-dd', 'en-US', '-03:00');
        if (this.gasto.dtPagamento) {
          this.gasto.dtPagamento = formatDate(data.dtPagamento, 'yyyy-MM-dd', 'en-US', '-03:00');
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
        console.log(this.categoriasGasto);
      },
      error => {
        console.log(error);
      }
    )

  }
  pagamento(cod: any, operacao: string) {
    this.apiService.pagarGasto(cod).subscribe(
      data => {
        console.log('O Gasto ' + data.nome + ' foi ' + operacao + ' com sucesso!');
        alert('O Gasto ' + data.nome + ' foi ' + operacao + ' com sucesso!');
      },
      error => {
        console.log(error);
      }
    );
  }

}
