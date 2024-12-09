import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaGastosPage } from './lista-gastos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaGastosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaGastosPageRoutingModule {}
