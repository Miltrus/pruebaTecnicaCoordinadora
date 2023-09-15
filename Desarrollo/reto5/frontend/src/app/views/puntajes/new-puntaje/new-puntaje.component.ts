import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PuntajeInterface } from 'src/app/models/puntaje.interface';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PremioService } from 'src/app/services/premio.service';
import { PuntajeService } from 'src/app/services/puntaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-puntaje',
  templateUrl: './new-puntaje.component.html',
  styleUrls: ['./new-puntaje.component.scss']
})
export class NewPuntajeComponent {

  empleados: any[] = [];
  premios: any[] = [];

  constructor(
    private router: Router,
    private api: PuntajeService,
    private empleado: EmpleadoService,
    private premio: PremioService,
  ) { }

  ngOnInit(): void {
    this.empleado.getAllEmpleados().subscribe(data => {
      this.empleados = data;
    });
    this.premio.getAllPremios().subscribe(data => {
      this.premios = data;
    });
  }

  newForm = new FormGroup({
    idPuntaje: new FormControl(''),
    idEmpleado: new FormControl('', Validators.required),
    idPremio: new FormControl('', Validators.required),
    puntos: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)])
  })

  postForm(form: PuntajeInterface) {

    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de que deseas crear este puntaje?',
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.postPuntaje(form).subscribe(data => {
          if (data.status == 'ok') {
            this.router.navigate(['puntajes/list-puntajes']);
            Swal.fire({
              icon: 'success',
              title: 'Puntaje creado',
              text: 'El puntaje ha sido creado exitosamente.',
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
              title: 'Error al crear',
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
