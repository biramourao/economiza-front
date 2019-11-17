import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { GastosComponent } from './gastos/gastos/gastos.component';
import { FormGastoComponent } from './gastos/form-gasto/form-gasto.component';
import { GraficosGastosComponent } from './gastos/graficos-gastos/graficos-gastos.component';
import { CategoriasDeGastoComponent } from './categorias-de-gasto/categorias-de-gasto/categorias-de-gasto.component';
import { FormCategoriaDeGastoComponent } from './categorias-de-gasto/form-categoria-de-gasto/form-categoria-de-gasto.component';

const appRoutes: Routes = [
  { path: 'gastos',
    component: GastosComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/gastos', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'relatorio', component: GraficosGastosComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'categorias-de-gasto', component: CategoriasDeGastoComponent, canActivate: [AuthGuard] },
  { path: 'categorias-de-gasto/:tipo/:codCategoriaGasto', component: FormCategoriaDeGastoComponent, canActivate: [AuthGuard] },
  { path: 'gastos/:tipo/:codGasto',
    component: FormGastoComponent,
    canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/not-found'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
