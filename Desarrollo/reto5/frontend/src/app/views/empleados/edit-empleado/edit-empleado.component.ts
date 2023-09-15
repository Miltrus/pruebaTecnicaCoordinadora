import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../../../services/empleado.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.scss']
})
export class EditEmpleadoComponent implements OnInit {


  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private api: EmpleadoService,
  ) { }

  dataEmpleado: any;

  editForm = new FormGroup({
    idEmpleado: new FormControl(''),
    documentoEmpleado: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]),
    nameEmpleado: new FormControl('', Validators.required),
    apellidoEmpleado: new FormControl('', Validators.required),
    telEmpleado: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    emailEmpleado: new FormControl('', [Validators.required, Validators.pattern('^[\\w.%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    cargoEmpleado: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    let idEmpleado = this.activatedRouter.snapshot.paramMap.get('id');

    this.api.getOneEmpleado(idEmpleado).subscribe((data: any) => {
      this.dataEmpleado = data;
      this.editForm.setValue({
        'idEmpleado': this.dataEmpleado.idEmpleado || '',
        'documentoEmpleado': this.dataEmpleado.documentoEmpleado || '',
        'nameEmpleado': this.dataEmpleado.nameEmpleado || '',
        'apellidoEmpleado': this.dataEmpleado.apellidoEmpleado || '',
        'telEmpleado': this.dataEmpleado.telEmpleado || '',
        'emailEmpleado': this.dataEmpleado.emailEmpleado || '',
        'cargoEmpleado': this.dataEmpleado.cargoEmpleado || '',
      });
    });
  }


  postForm(id: any) {
    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que deseas modificar este empleado?',
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.putEmpleado(id).subscribe(
          (data) => {
            if (data.status == 'ok') {
              this.router.navigate(['empleados/list-empleados']);
              Swal.fire({
                icon: 'success',
                title: 'Empelado modificado',
                text: 'El empleado ha sido modificado exitosamente.',
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
    this.router.navigate(['empleados/list-empleados']);
  }
}