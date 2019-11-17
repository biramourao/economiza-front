import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fontes-de-renda',
  templateUrl: './fontes-de-renda.component.html',
  styleUrls: ['./fontes-de-renda.component.css']
})
export class FontesDeRendaComponent implements OnInit {
  
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
