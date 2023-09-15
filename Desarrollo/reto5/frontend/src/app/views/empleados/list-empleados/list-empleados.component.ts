import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EmpleadoService } from '../../../services/empleado.service';
import { Router } from '@angular/router';
import { EmpleadoInterface } from 'src/app/models/empleado.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.scss']
})
export class ListEmpleadosComponent implements OnInit {

  constructor(
    private api: EmpleadoService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  empleados: any[] = [];
  dataSource = new MatTableDataSource(this.empleados);

  @ViewChild(MatPaginator) paginator!: MatPaginator; //para la paginacion, y los del ! pal not null
  @ViewChild('viewEmpleadoDialog') viewEmpleadoDialog!: TemplateRef<any>;

  ngOnInit(): void {
    this.api.getAllEmpleados().subscribe(data => {
      this.empleados = data;

      if (this.empleados.length == 0) {
        Swal.fire({
          icon: 'info',
          title: 'No hay empleados',
          text: 'No hay empleados registrados en la base de datos.',
          toast: true,
          showConfirmButton: false,
          timer: 5000,
          position: 'top-end',
          timerProgressBar: true,
          showCloseButton: true,
        });
      }
      this.empleados.forEach(puntaje => {
        this.api.getPuntajeTotal(puntaje.idEmpleado).subscribe(empleado => {
          puntaje.totalPuntos = empleado.totalPuntos || 0;
        });
      });
      this.dataSource.data = this.empleados;
    })
  }

  ngAfterViewInit() { //para la paginacion
    this.dataSource.paginator = this.paginator;
  }


  editEmpleado(id: any) {
    this.router.navigate(['empleados/edit-empleado', id]);
  }

  newEmpleado() {
    this.router.navigate(['empleados/new-empleado']);
  }

  viewEmpleado(empleado: EmpleadoInterface): void {
    this.dialog.open(this.viewEmpleadoDialog, {
      data: empleado,
      width: '35%',
      height: 'auto',
    });
  }

  deleteEmpleado(id: any): void {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de que deseas eliminar este empleado?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      reverseButtons: true,
      denyButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isDenied) {
        this.api.deleteEmpleado(id).subscribe(
          data => {
            if (data.status == 'ok') {
              this.empleados = this.empleados.filter(empleado => empleado.idEmpleado !== id);
              this.dataSource.data = this.empleados; // Actualizar el dataSource con los nuevos datos
              Swal.fire({
                icon: 'success',
                title: 'Empleado eliminado',
                text: 'El empleado ha sido eliminado exitosamente.',
                toast: true,
                showConfirmButton: false,
                timer: 5000,
                position: 'top-end',
                timerProgressBar: true,
                showCloseButton: true,
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: data.msj,
              });
            }
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Error en el servidor',
              text: 'Ha ocurrido un error al comunicarse con el servidor. Por favor, revisa tu conexión a internet o inténtalo nuevamente.',
            });
          });
      }
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
