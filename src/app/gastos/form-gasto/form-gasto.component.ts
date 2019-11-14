import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Gasto } from 'src/app/model/gasto';
import { ApiService } from 'src/app/api.service';
import { CategoriaGasto } from 'src/app/model/categoria-gasto';

@Component({
  selector: 'app-form-gasto',
  templateUrl: './form-gasto.component.html',
  styleUrls: ['./form-gasto.component.css']
})
export class FormGastoComponent implements OnInit {
  titleForm: string;
  gasto = new Gasto();
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
            this.router.navigate(['/not-found']);
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
      case 'cadastrar': {
        this.cadastrarGasto();
        break;
      }
      case 'editar': {
        this.editarGasto();
        break;
      }
    }
  }

  cadastrarGasto() {
    this.apiService.cadastrarGasto(this.gasto).subscribe(
      data => {
        console.log('A categoria ' + data.nome + ' foi cadastrada com sucesso!');
        const decisao = confirm('A categoria ' + data.nome + ' foi cadastrada com sucesso!\n Deseja realizar novo cadastro?');
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
        console.log('A categoria ' + data.nome + ' foi editada com sucesso!');
        const decisao = confirm('A categoria ' + data.nome + ' foi editada com sucesso!\n Deseja realizar novo cadastro?');
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

}
