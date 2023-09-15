import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PremioService } from 'src/app/services/premio.service';
import { PuntajeService } from 'src/app/services/puntaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-puntaje',
  templateUrl: './edit-puntaje.component.html',
  styleUrls: ['./edit-puntaje.component.scss']
})
export class EditPuntajeComponent {

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private api: PuntajeService,
    private empleado: EmpleadoService,
    private premio: PremioService,
  ) { }

  dataPremio: any;
  empleados: any[] = [];
  premios: any[] = [];

  editForm = new FormGroup({
    idPuntaje: new FormControl(''),
    idEmpleado: new FormControl('', Validators.required),
    idPremio: new FormControl('', Validators.required),
    puntos: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)])
  });

  ngOnInit(): void {
    let idPuntaje = this.activatedRouter.snapshot.paramMap.get('id');

    this.api.getOnePuntaje(idPuntaje).subscribe((data: any) => {
      this.dataPremio = data;
      this.editForm.setValue({
        'idPuntaje': this.dataPremio.idPuntaje || '',
        'idEmpleado': this.dataPremio.idEmpleado || '',
        'idPremio': this.dataPremio.idPremio || '',
        'puntos': this.dataPremio.puntos || '',
      });
    });


    this.empleado.getAllEmpleados().subscribe((data: any) => {
      this.empleados = data;
    });


    this.premio.getAllPremios().subscribe((data: any) => {
      this.premios = data;
    });
  }


  postForm(id: any) {
    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que deseas modificar este puntaje?',
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.putPuntaje(id).subscribe(
          (data) => {
            if (data.status == 'ok') {
              this.router.navigate(['puntajes/list-puntajes']);
              Swal.fire({
                icon: 'success',
                title: 'Puntaje modificado',
                text: 'El puntaje ha sido modificado exitosamente.',
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
                title: 'Error al modificar',
                text: data.msj,
              });
            }
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error en el servidor',
              text: 'Ha ocurrido un error al comunicarse con el servidor. Por favor, revisa tu conexión a internet o inténtalo nuevamente',
            });
          });
      }
    });
  }

  goBack() {
    this.router.navigate(['puntajes/list-puntajes']);
  }
}
