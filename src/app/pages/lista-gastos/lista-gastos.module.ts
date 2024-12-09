import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaGastosPageRoutingModule } from './lista-gastos-routing.module';

import { ListaGastosPage } from './lista-gastos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaGastosPageRoutingModule
  ],
  declarations: [ListaGastosPage]
})
export class ListaGastosPageModule {}
