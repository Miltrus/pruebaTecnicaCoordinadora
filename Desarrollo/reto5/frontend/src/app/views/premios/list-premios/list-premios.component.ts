import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PremioInterface } from 'src/app/models/premio.interface';
import { PremioService } from 'src/app/services/premio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-premios',
  templateUrl: './list-premios.component.html',
  styleUrls: ['./list-premios.component.scss']
})
export class ListPremiosComponent {

  constructor(
    private api: PremioService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  premios: PremioInterface[] = [];
  dataSource = new MatTableDataSource(this.premios);

  @ViewChild(MatPaginator) paginator!: MatPaginator; //para la paginacion, y los del ! pal not null
  @ViewChild('viewPremioDialog') viewPremioDialog!: TemplateRef<any>;

  ngOnInit(): void {
    this.api.getAllPremios().subscribe(data => {
      this.premios = data;
      this.dataSource.data = this.premios;

      if (this.premios.length == 0) {
        Swal.fire({
          icon: 'info',
          title: 'No hay premios',
          text: 'No hay premios registrados en la base de datos.',
          toast: true,
          showConfirmButton: false,
          timer: 5000,
          position: 'top-end',
          timerProgressBar: true,
          showCloseButton: true,
        });
      }
    })
  }

  ngAfterViewInit() { //para la paginacion
    this.dataSource.paginator = this.paginator;
  }


  editPremio(id: any) {
    this.router.navigate(['premios/edit-premio', id]);
  }

  newPremio() {
    this.router.navigate(['premios/new-premio']);
  }

  viewPremio(premio: PremioInterface): void {
    this.dialog.open(this.viewPremioDialog, {
      data: premio,
      width: '35%',
      height: 'auto',
    });
  }

  deletePremio(id: any): void {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de que deseas eliminar este premio?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      reverseButtons: true,
      denyButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isDenied) {
        this.api.deletePremio(id).subscribe(
          data => {
            if (data.status == 'ok') {
              this.premios = this.premios.filter(premios => premios.idPremio !== id);
              this.dataSource.data = this.premios; // Actualizar el dataSource con los nuevos datos
              Swal.fire({
                icon: 'success',
                title: 'Premio eliminado',
                text: 'El premio ha sido eliminado exitosamente.',
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
