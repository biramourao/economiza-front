import { CategoriaGasto } from './categoria-gasto';
import { CartaoDeCredito } from './cartaodecredito';

export class Gasto {
	cod: number;
	nome: string;
	valor: number;
	vencimento: Date;
	qtdParcelas: number;
	dtPagamento: Date;
	categoriaGasto: CategoriaGasto;
	cartaoDeCredito: CartaoDeCredito;
}