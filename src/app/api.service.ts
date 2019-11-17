import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthLoginInfo } from './auth/auth-login-info';
import { SignUpInfo } from './auth/sign-up-info';
import { CategoriaGasto } from './model/categoria-gasto';
import { Gasto } from './model/gasto';
import { FonteDeRenda } from './model/fonte-de-renda';
import { Usuario } from './model/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  //Metodos de autenticação
  login(usuario: any) {
    const url = `${this.apiURL}/usuarios/login`;
    return this.http.post<AuthLoginInfo>(url, usuario)
  }
  cadastraUsuario(usuario: any) {
    const url = `${this.apiURL}/usuarios`;
    return this.http.post<SignUpInfo>(url, usuario);
  }

  //Metodos de categoria de Gasto
  listCategoriaDeGasto() {
    const url = `${this.apiURL}/categorias-de-gasto`;
    return this.http.get<CategoriaGasto>(url, { responseType: 'json' });
  }
  cadastrarCategoriaGasto(categoriaGasto: CategoriaGasto) {
    const url = `${this.apiURL}/categorias-de-gasto`;
    return this.http.post<CategoriaGasto>(url, categoriaGasto);
  }
  excluirCategoriaGasto(cod: any) {
    const url = `${this.apiURL}/categorias-de-gasto/${cod}`;
    return this.http.delete<any>(url);
  }
  getCategoriaGasto(cod: any) {
    const url = `${this.apiURL}/categorias-de-gasto/${cod}`;
    return this.http.get<CategoriaGasto>(url);
  }
  editarCategoriaGasto(categoriaDeGasto: CategoriaGasto) {
    const url = `${this.apiURL}/categorias-de-gasto/${categoriaDeGasto.cod}`;
    return this.http.put<CategoriaGasto>(url, categoriaDeGasto);
  }

  //Metodos de Gasto
  listGasto(dtInicio: string, dtFim: string) {
    const params = new HttpParams().set('dtInicio', dtInicio).set('dtFim', dtFim);
    const url = `${this.apiURL}/gastos`;
    return this.http.get<CategoriaGasto>(url, { responseType: 'json', params });
  }
  cadastrarGasto(gasto: Gasto) {
    const url = `${this.apiURL}/gastos`;
    return this.http.post<Gasto>(url, gasto);
  }
  editarGasto(gasto: Gasto) {
    const url = `${this.apiURL}/gastos/${gasto.cod}`;
    return this.http.put<Gasto>(url, gasto);
  }
  getGasto(cod: any) {
    const url = `${this.apiURL}/gastos/${cod}`;
    return this.http.get<Gasto>(url);
  }
  excluirGasto(cod: any) {
    const url = `${this.apiURL}/gastos/${cod}`;
    return this.http.delete<any>(url);
  }
  pagarGasto(cod: any) {
    const url = `${this.apiURL}/gastos/${cod}/pagamento`;
    return this.http.patch<Gasto>(url, { responseType: 'json' });
  }
  //Metodos de Usuário
  deleteUsuario(cod: any) {
    const url = `${this.apiURL}/usuarios/${cod}`;
    return this.http.delete<any>(url);
  }
  getUsuario() {
    const url = `${this.apiURL}/usuarios`;
    return this.http.get<Usuario>(url);
  }
  editarUsuario(usuario: Usuario) {
    const url = `${this.apiURL}/usuarios/${usuario.cod}`;
    return this.http.put<Usuario>(url, usuario);
  }

  //Metodos de Fonte de Renda
  listFontesDeRenda(dtInicio: string, dtFim: string) {
    const params = new HttpParams().set('dtInicio', dtInicio).set('dtFim', dtFim);
    const url = `${this.apiURL}/fontes-de-renda`;
    return this.http.get<FonteDeRenda>(url, { responseType: 'json', params });
  }
  cadastrarFonteDeRenda(fonteDeRenda: FonteDeRenda) {
    const url = `${this.apiURL}/fontes-de-renda`;
    return this.http.post<FonteDeRenda>(url, fonteDeRenda);
  }
  editarFonteDeRenda(fonteDeRenda: FonteDeRenda) {
    const url = `${this.apiURL}/fontes-de-renda/${fonteDeRenda.cod}`;
    return this.http.put<FonteDeRenda>(url, fonteDeRenda);
  }
  excluirFonteDeRenda(cod: any) {
    const url = `${this.apiURL}/fontes-de-renda/${cod}`;
    return this.http.delete<any>(url);
  }
  getFonteDeRenda(cod: any) {
    const url = `${this.apiURL}/fontes-de-renda/${cod}`;
    return this.http.get<FonteDeRenda>(url);
  }
}