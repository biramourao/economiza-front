import { CategoriaGasto } from './categoria-gasto';
import { CartaoDeCredito } from './cartaodecredito';

export class Gasto {
	cod: number;
	nome: string;
	valor: number;
	vencimento: any;
	qtdParcelas: number;
	dtPagamento: any;
	categoriaGasto = new CategoriaGasto();
	cartaoDeCredito: CartaoDeCredito;
}