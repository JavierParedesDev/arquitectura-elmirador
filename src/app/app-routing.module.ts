import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lista-gastos',
    pathMatch: 'full'
  },
  {
    path: 'lista-gastos',
    loadChildren: () => import('./pages/lista-gastos/lista-gastos.module').then( m => m.ListaGastosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
