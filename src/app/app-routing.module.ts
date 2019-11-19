import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './components/guards/auth-guard.service';
import { PreloadAllModules, NoPreloading } from '@angular/router';
import { NotAllowedComponent } from './components/not-allowed/not-allowed.component';
import {ClothsResolver} from './core/DataSources/cloths.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: './welcome/welcome.module#WelcomeModule'
  },
  {
    path: 'clothes',
    loadChildren: './clothes/clothes.module#ClothesModule',
    resolve: {
      cloths: ClothsResolver
    }
  },
  {
    path: 'not-allowed',
    component: NotAllowedComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
