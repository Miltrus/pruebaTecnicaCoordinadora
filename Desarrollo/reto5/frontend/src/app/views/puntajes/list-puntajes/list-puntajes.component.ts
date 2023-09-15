import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PuntajeInterface } from 'src/app/models/puntaje.interface';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PremioService } from 'src/app/services/premio.service';
import { PuntajeService } from 'src/app/services/puntaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-puntajes',
  templateUrl: './list-puntajes.component.html',
  styleUrls: ['./list-puntajes.component.scss']
})
export class ListPuntajesComponent {

  puntajes: any[] = []
  dataSource = new MatTableDataSource(this.puntajes);

  @ViewChild(MatPaginator) paginator!: MatPaginator; //para la paginacion, y los del ! pal not null
  @ViewChild('viewPuntajeDialog') viewPuntajeDialog!: TemplateRef<any>;

  constructor(
    private api: PuntajeService,
    private router: Router,
    private dialog: MatDialog,
    private empleadoService: EmpleadoService,
    private premioService: PremioService,
  ) { }


  ngOnInit(): void {
    this.api.getAllPuntajes().subscribe(data => {
      this.puntajes = data;

      if (this.puntajes.length == 0) {
        Swal.fire({
          icon: 'info',
          title: 'No hay puntajes',
          text: 'No hay puntajes registrados en la base de datos.',
          toast: true,
          showConfirmButton: false,
          timer: 5000,
          position: 'top-end',
          timerProgressBar: true,
          showCloseButton: true,
        });
      }

      this.puntajes.forEach(puntaje => {
        this.empleadoService.getOneEmpleado(puntaje.idEmpleado).subscribe(empleado => {
          puntaje.nameEmpleado = empleado.nameEmpleado;
          puntaje.apellidoEmpleado = empleado.apellidoEmpleado;
          puntaje.documentoEmpleado = empleado.documentoEmpleado;
        });
        this.premioService.getOnePremio(puntaje.idPremio).subscribe(premio => {
          puntaje.codigoPremio = premio.codigoPremio;
          puntaje.valorPremio = premio.valorPremio;
        });
      });
      this.dataSource.data = this.puntajes;
    })
  }


  ngAfterViewInit() { //para la paginacion
    this.dataSource.paginator = this.paginator;
  }


  editPuntaje(id: any) {
    this.router.navigate(['puntajes/edit-puntaje', id]);
  }

  newPuntaje() {
    this.router.navigate(['puntajes/new-puntaje']);
  }

  viewPuntaje(puntaje: PuntajeInterface): void {
    this.dialog.open(this.viewPuntajeDialog, {
      data: puntaje,
      width: '35%',
      height: 'auto',
    });
  }

  deletePuntaje(id: any): void {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de que deseas eliminar este puntaje?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      reverseButtons: true,
      denyButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isDenied) {
        this.api.deletePuntaje(id).subscribe(
          data => {
            if (data.status == 'ok') {
              this.puntajes = this.puntajes.filter(puntajes => puntajes.idPuntaje !== id);
              this.dataSource.data = this.puntajes; // Actualizar el dataSource con los nuevos datos
              Swal.fire({
                icon: 'success',
                title: 'Puntaje eliminado',
                text: 'El puntaje ha sido eliminado exitosamente.',
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
