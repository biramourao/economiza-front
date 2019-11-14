import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { GastosComponent } from './gastos/gastos/gastos.component';
import { FormGastoComponent } from './gastos/form-gasto/form-gasto.component';

const appRoutes: Routes = [
  { path: 'gastos',
    component: GastosComponent,
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', component: GastosComponent,
    canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'gastos/:tipo/:codGasto',
    component: FormGastoComponent,
    canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/not-found' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
