import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../../services/empleado.service';
import { EmpleadoInterface } from '../../../models/empleado.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-empleado',
  templateUrl: './new-empleado.component.html',
  styleUrls: ['./new-empleado.component.scss']
})
export class NewEmpleadoComponent {

  constructor(
    private router: Router,
    private api: EmpleadoService,
  ) { }


  newForm = new FormGroup({
    idEmpleado: new FormControl(''),
    documentoEmpleado: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]),
    nameEmpleado: new FormControl('', Validators.required),
    apellidoEmpleado: new FormControl('', Validators.required),
    telEmpleado: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    emailEmpleado: new FormControl('', [Validators.required, Validators.pattern('^[\\w.%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    cargoEmpleado: new FormControl('', Validators.required),
  })

  postForm(form: EmpleadoInterface) {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de que deseas crear este empleado?',
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.postEmpleado(form).subscribe(data => {
          if (data.status == 'ok') {
            this.router.navigate(['empleados/list-empleados']);
            Swal.fire({
              icon: 'success',
              title: 'Empleado creado',
              text: 'El empleado ha sido creado exitosamente.',
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
    this.router.navigate(['empleados/list-empleados']);
  }

}