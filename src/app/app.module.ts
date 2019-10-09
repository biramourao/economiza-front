import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormCadastroUsuarioComponent } from './form-cadastro-usuario/form-cadastro-usuario.component';
import { PageLoginComponent } from './page-login/page-login.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    FormCadastroUsuarioComponent,
    PageLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
