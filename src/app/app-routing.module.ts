import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { GastosComponent } from './gastos/gastos/gastos.component';
import { FormGastoComponent } from './gastos/form-gasto/form-gasto.component';
import { CadastroUsuarioComponent } from './usuario/cadastro-usuario/cadastro-usuario.component';
import { DetalheCadastroComponent } from './usuario/detalhe-cadastro/detalhe-cadastro.component';
import { GraficosGastosComponent } from './gastos/graficos-gastos/graficos-gastos.component';
import { CategoriasDeGastoComponent } from './categorias-de-gasto/categorias-de-gasto/categorias-de-gasto.component';
import { FormCategoriaDeGastoComponent } from './categorias-de-gasto/form-categoria-de-gasto/form-categoria-de-gasto.component';
import { FontesDeRendaComponent } from './fontes-de-renda/fontes-de-renda/fontes-de-renda.component';
import { FormFonteDeRendaComponent } from './fontes-de-renda/form-fonte-de-renda/form-fonte-de-renda.component';


const appRoutes: Routes = [
  {
    path: 'gastos',
    component: GastosComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/gastos', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'relatorio', component: GraficosGastosComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: NotFoundComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'detalhes-usuario', component: DetalheCadastroComponent, canActivate: [AuthGuard] },
  { path: 'categorias-de-gasto', component: CategoriasDeGastoComponent, canActivate: [AuthGuard] },

  {
    path: 'categorias-de-gasto/:tipo/:codCategoriaGasto',
    component: FormCategoriaDeGastoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gastos/:tipo/:codGasto',
    component: FormGastoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fontes-de-renda',
    component: FontesDeRendaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fontes-de-renda/:tipo/:codFonteDeRenda',
    component: FormFonteDeRendaComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/not-found', canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
