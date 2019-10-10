import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  login(usuario: any){
    const url = `${this.apiURL}/usuarios/login`;
    return this.http.post<Usuario>(url, usuario)
  }
}
