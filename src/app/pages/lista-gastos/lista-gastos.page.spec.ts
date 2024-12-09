import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaGastosPage } from './lista-gastos.page';

describe('ListaGastosPage', () => {
  let component: ListaGastosPage;
  let fixture: ComponentFixture<ListaGastosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGastosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
