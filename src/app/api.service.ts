import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthLoginInfo } from './auth/auth-login-info';
import { SignUpInfo } from './auth/sign-up-info';
import { Observable } from 'rxjs';
import { CategoriaGasto } from './model/categoria-gasto';
import { Gasto } from './model/gasto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(usuario: any) {
    const url = `${this.apiURL}/usuarios/login`;
    return this.http.post<AuthLoginInfo>(url, usuario)
  }
    cadastraUsuario(usuario: any) {
    const url = `${this.apiURL}/usuarios`;
    return this.http.post<SignUpInfo>(url, usuario);
  }
  listCategoriaDeGasto() {
    const url = `${this.apiURL}/categorias-de-gasto`;
    return this.http.get<CategoriaGasto>(url, { responseType: 'json' });
  }
  cadastroCategoriaGasto(categoriaGasto: CategoriaGasto) {
    const url = `${this.apiURL}/categorias-de-gasto`;
    return this.http.post<CategoriaGasto>(url, categoriaGasto);
  }
  excluirCategoriaGasto(cod: any) {
    const url = `${this.apiURL}/categorias-de-gasto/${cod}`;
    return this.http.delete<any>(url);
  }
  listGasto() {
    const url = `${this.apiURL}/gastos`;
    return this.http.get<CategoriaGasto>(url, { responseType: 'json' });
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
}