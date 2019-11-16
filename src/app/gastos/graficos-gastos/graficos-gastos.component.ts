import { Component, OnInit } from '@angular/core';
import { GlobalConstantsService } from 'src/app/shared/global-constants.service';
import { ApiService } from 'src/app/api.service';
import { CategoriaGasto } from 'src/app/model/categoria-gasto';
import { Gasto } from 'src/app/model/gasto';
import { ActivatedRoute } from '@angular/router';
import { BarDataChartJs } from 'src/app/model/bardatachartjs';
import { DoughnutDataChartJs } from 'src/app/model/doughnutdatachartjs';

@Component({
  selector: 'app-graficos-gastos',
  templateUrl: './graficos-gastos.component.html',
  styleUrls: ['./graficos-gastos.component.css']
})
export class GraficosGastosComponent implements OnInit {
  //Dados do Grafico em Barra
  barChartData: BarDataChartJs[] | { data: number[]; label: string; }[];
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartType = 'bar';
  barChartLegend = true;
  barChartLabels = [''];
  //Dados do Grafico em Rosquinha
  doughnutChartData: DoughnutDataChartJs[];
  doughnutChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  doughnutChartType = 'doughnut';
  doughnutChartLegend = true;
  doughnutChartLabels = ['Não Pago', 'Pago'];

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
    this.doughnutChartData = [
      { data: [0, 0] }
    ];
    console.log(this.doughnutChartData);
  }

  ngOnInit() {
    this.atualizaGastos(this.inicio, this.fim);

  }

  atualizaGastos(dtInicio: string, dtFim: string) {
    this.listCategoriaGasto();
    this.apiService.listGasto(dtInicio, dtFim).subscribe(
      data => {
        this.gastos = data as unknown as Gasto[];
        this.groupByCategoria();
        this.globalConstants.setTotalGastos(this.somaGastos(this.gastos));
        this.globalConstants.gastos = data as unknown as Gasto[];
        this.groupByPagamento();
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

  groupByCategoria() {

    let gastoPorCategoria = new Array<BarDataChartJs>();

    for (const categoria of this.listaCategoriasGasto) {

      let chart = new BarDataChartJs();
      chart.data = new Array<number>();
      chart.data[0] = 0;
      chart.label = categoria.descricao;

      for (const gasto of this.gastos) {

        if (gasto.categoriaGasto.cod === categoria.cod) {
          chart.data[0] += gasto.valor;
        }
      }
      if(chart.data[0]>0){
        gastoPorCategoria.push(chart);
      }
    }
    let chart = new BarDataChartJs();
      
    if (gastoPorCategoria.length > 0) {
      gastoPorCategoria[0].data[1] = 0;
      this.barChartData = gastoPorCategoria;
    }

  }

  somaGastos(gastos: Array<Gasto>): number {
    let totalGastos = 0;
    for (const iterator of gastos) {
      totalGastos += iterator.valor;
    }
    return totalGastos;
  }
  groupByPagamento() {
    let totalPago = 0;
    let totalNaoPago = 0;

    for (const gasto of this.gastos) {

      if (gasto.dtPagamento) {
        totalPago += gasto.valor;
      } else {
        totalNaoPago += gasto.valor;
      }
    }
    let doughnutChartData = new DoughnutDataChartJs();
    let number = [totalNaoPago, totalPago];
    console.log(number);
    doughnutChartData.data = number;
    console.log(doughnutChartData);
    this.doughnutChartData[0].data = number;
    console.log(this.doughnutChartData);
  }

}
