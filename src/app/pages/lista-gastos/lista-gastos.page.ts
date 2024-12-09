import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GastosService } from 'src/app/services/gastos.service';

@Component({
  selector: 'app-lista-gastos',
  templateUrl: './lista-gastos.page.html',
  styleUrls: ['./lista-gastos.page.scss'],
})
export class ListaGastosPage implements OnInit {
  nuevoGasto = {
    id: Date.now(),
    departamento: '', // Agregamos el campo departamento
    mes: '',
    anio: '',
    monto: 0,
    pagado: false,
  };

  gastoEditable: any = {};
  gastos: any[] = [];
  isEditModalOpen = false;
  filteredGastos: any[] = [];
  searchTerm: string = '';
  filterPagado: string = '';
  mesFiltrar: string = '';
  anioFiltrar: string = '';

  constructor(private gastosService: GastosService, private http: HttpClient) {}

  ngOnInit() {
    this.loadGastos(); // Cargar los datos al inicio
  }

  // Cargar los gastos desde la API (o desde localStorage si no se puede conectar)
  loadGastos() {
    this.gastosService.getGastos().subscribe(
      (data) => {
        this.gastos = data;
        this.filteredGastos = [...this.gastos]; // Aseguramos que la lista filtrada tenga todos los gastos al inicio
        this.gastosService.saveToLocalStorage(data); // Guardar los datos en localStorage
      },
      (error) => {
        console.error('Error al cargar los gastos:', error);
        this.gastos = this.gastosService.getGastosFromLocalStorage(); // Si falla la conexión, cargamos desde localStorage
        this.filteredGastos = [...this.gastos]; // Aseguramos que la lista filtrada tenga todos los gastos al inicio
      }
    );
  }

  agregarGasto(form: any) {
    const nuevoGasto = { ...form.value };  // Capturamos todos los valores del formulario en el objeto nuevoGasto.

    // Verificar si ya existe un gasto con el mismo id, departamento, mes y año
    const gastoExistente = this.gastos.find(gasto =>
      gasto.id === nuevoGasto.id &&  // Usamos `id` para comparar
      gasto.departamento === nuevoGasto.departamento && // Comparar con departamento también
      gasto.mes === nuevoGasto.mes &&
      gasto.anio === nuevoGasto.anio
    );
  
    if (gastoExistente) {
      console.error('Ya existe un gasto para este ID y departamento en el mes y año seleccionados');
      // Puedes mostrar una alerta o un mensaje de error
      return;
    }
  
    // Si no existe, proceder a agregar el nuevo gasto
    this.gastosService.addGasto(nuevoGasto).subscribe(
      (response) => {
        this.loadGastos(); // Recargamos la lista de gastos desde la API
      },
      (error) => {
        console.error('Error al agregar gasto:', error);
      }
    );
    this.loadGastos();
  
    form.reset();  // Limpiamos el formulario después de agregar el gasto
  }
  
  // Abrir el modal de edición
  abrirModalEdicion(index: number) {
    this.gastoEditable = { ...this.gastos[index], index };
    this.isEditModalOpen = true;
  }

  // Guardar cambios en el gasto
  guardarCambios(form: any) {
    const index = this.gastoEditable.index;
    this.gastos[index] = { ...this.gastoEditable };

    this.gastosService.editGasto(this.gastoEditable).subscribe(
      (response) => {
        this.loadGastos(); // Recargamos la lista de gastos
        this.cerrarModal(); // Cerramos el modal
      },
      (error) => {
        console.error('Error al editar gasto:', error);
      }
    );
  }

  // Cerrar modal
  cerrarModal() {
    this.isEditModalOpen = false;
    this.gastoEditable = {}; // Limpiamos cualquier dato residual
  }

  // Filtrar los gastos basados en el término de búsqueda
  filtrarGastos() {
    let gastosFiltrados = [...this.gastos];

    // Filtrar por término de búsqueda
    if (this.searchTerm.trim() !== '') {
      gastosFiltrados = gastosFiltrados.filter(
        (gasto) =>
          gasto.id.toString().includes(this.searchTerm) ||
          gasto.mes.toString().includes(this.searchTerm) ||
          gasto.anio.toString().includes(this.searchTerm) ||
          gasto.monto.toString().includes(this.searchTerm) ||
          gasto.departamento.toString().includes(this.searchTerm) // Incluir filtro por departamento
      );
    }

    // Filtrar por estado de pago (Pagado / No Pagado)
    if (this.filterPagado === 'pagado') {
      gastosFiltrados = gastosFiltrados.filter((gasto) => gasto.pagado === 1);
    } else if (this.filterPagado === 'no-pagado') {
      gastosFiltrados = gastosFiltrados.filter((gasto) => gasto.pagado === 0);
    }
    // Filtrar por mes
    if (this.mesFiltrar) {
      gastosFiltrados = gastosFiltrados.filter(
        (gasto) => gasto.mes === this.mesFiltrar
      );
    }

    // Filtrar por año
    if (this.anioFiltrar) {
      gastosFiltrados = gastosFiltrados.filter(
        (gasto) => gasto.anio === this.anioFiltrar
      );
    }

    // Asignar los gastos filtrados a la variable filteredGastos
    this.filteredGastos = gastosFiltrados;
  }

  // Obtener los gastos de la API
  obtenerGastos() {
    this.http.get<any[]>('http://localhost:3000/lista_gastos').subscribe(
      (response) => {
        this.gastos = response;
        this.filteredGastos = [...this.gastos]; // Inicializamos la lista filtrada con todos los gastos
      },
      (error) => {
        console.error('Error al obtener los gastos:', error);
      }
    );
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      
      event.target.complete();
    }, 2000);
  }
}
