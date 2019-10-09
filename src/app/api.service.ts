import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Usuario } from 'src/model/usuario'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  login(usuario): Observable<Usuario> {
    const url = `${apiUrl}/login`;
    return this.http.post<Usuario>(apiUrl, usuario, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((usuario: Usuario) => console.log(`login aceito com w/ id=${usuario.email}`)),
      //catchError(this.handleError<Usuario>('addProduto'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
