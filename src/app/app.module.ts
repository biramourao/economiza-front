import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { GastosComponent } from './gastos/gastos/gastos.component';
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpErrorInterceptor } from './auth/httperrorinterceptor';
import { AuthInterceptor } from './auth/auth-interceptor';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { routing } from './app-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { FormGastoComponent } from './gastos/form-gasto/form-gasto.component';
import { MenuSuperiorComponent } from './shared/menu-superior/menu-superior.component';
import { MenuLateralComponent } from './shared/menu-lateral/menu-lateral.component';
import { CadastroUsuarioComponent } from './usuario/cadastro-usuario/cadastro-usuario.component';
import { DetalheCadastroComponent } from './usuario/detalhe-cadastro/detalhe-cadastro.component';
import { ChartsModule } from 'ng2-charts';
import { GraficosGastosComponent } from './gastos/graficos-gastos/graficos-gastos.component';
import * as _ from 'underscore';
import { CategoriasDeGastoComponent } from './categorias-de-gasto/categorias-de-gasto/categorias-de-gasto.component';
import { FormCategoriaDeGastoComponent } from './categorias-de-gasto/form-categoria-de-gasto/form-categoria-de-gasto.component';
import { FontesDeRendaComponent } from './fontes-de-renda/fontes-de-renda/fontes-de-renda.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GastosComponent,
    NotFoundComponent,
    FormGastoComponent,
    MenuSuperiorComponent,
    MenuLateralComponent,
    CadastroUsuarioComponent,
    DetalheCadastroComponent,
    GraficosGastosComponent,
    CategoriasDeGastoComponent,
    FormCategoriaDeGastoComponent,
    FontesDeRendaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [ApiService,
    AuthGuard,
    HttpClient,
    FormGastoComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
