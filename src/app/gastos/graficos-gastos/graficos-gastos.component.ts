import { Component, OnInit } from '@angular/core';
import { GlobalConstantsService } from 'src/app/shared/global-constants.service';
import { ApiService } from 'src/app/api.service';
import { CategoriaGasto } from 'src/app/model/categoria-gasto';
import * as _ from 'underscore';
import { DataChartJs } from 'src/app/model/datachartjs';
import { Gasto } from 'src/app/model/gasto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graficos-gastos',
  templateUrl: './graficos-gastos.component.html',
  styleUrls: ['./graficos-gastos.component.css']
})
export class GraficosGastosComponent implements OnInit {
  barChartData: DataChartJs[] | { data: number[]; label: string; }[];
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartType = 'bar';
  barChartLegend = true;
  barChartLabels = ['CATEGORIAS'];
  listaCategoriasGasto = new Array<CategoriaGasto>();
  parametros: any;
  gastos = new Array<Gasto>();
  inicio: string;
  fim: string;


  constructor(public globalConstants: GlobalConstantsService, private apiService: ApiService, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.parametros = { ...params.keys, ...params };
    });
    this.inicio = this.parametros.params.inicio;
    this.fim = this.parametros.params.fim;
    this.barChartData = [
      { data: [0], label: '' }
    ];
  }

  ngOnInit() {
    this.atualizaGastos(this.inicio, this.fim);

  }

  atualizaGastos(dtInicio: string, dtFim: string) {
    this.listCategoriaGasto();
    this.apiService.listGasto(dtInicio, dtFim).subscribe(
      data => {
        this.gastos = data as unknown as Gasto[];
        this.groupBy();
      },
      error => {
        console.log(error);
        alert(error.msg);
      }
    );
  }

  listCategoriaGasto() {
    this.apiService.listCategoriaDeGasto().subscribe(
      data => {
        this.listaCategoriasGasto = data as unknown as Array<CategoriaGasto>;
      },
      error => {
        console.log(error);
      }
    );
  }

  groupBy() {
    let gastoPorCategoria = new Array<DataChartJs>();

    for (const categoria of this.listaCategoriasGasto) {
      let chart = new DataChartJs();
      chart.data = new Array<number>();
      chart.data[0] = 0;
      chart.label = categoria.descricao;

      for (const gasto of this.globalConstants.gastos) {

        if (gasto.categoriaGasto.cod === categoria.cod) {
          chart.data[0] += gasto.valor;
        }
      }
      gastoPorCategoria.push(chart);
    }
    if (gastoPorCategoria.length > 0) {
      this.barChartData = gastoPorCategoria;
    }
  }

}
