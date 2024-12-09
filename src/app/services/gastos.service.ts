import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  private apiUrl = 'http://localhost:3000'; // Aquí iría tu URL de la API
  private storageKey = 'gastos';

  constructor(private http: HttpClient) {}

  // Obtener todos los gastos desde la API
  getGastos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lista_gastos`);
  }

  // Agregar un nuevo gasto, primero en la API y luego en localStorage
  addGasto(gasto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar_gastos`, gasto);
  }

  // Editar un gasto en la API
  editGasto(gasto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pagar`, gasto);
  }

  // Guardar los gastos en localStorage (en caso de necesitarlo)
  saveToLocalStorage(gastos: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(gastos));
  }

  // Obtener los gastos de localStorage (si la API no responde)
  getGastosFromLocalStorage(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
}
