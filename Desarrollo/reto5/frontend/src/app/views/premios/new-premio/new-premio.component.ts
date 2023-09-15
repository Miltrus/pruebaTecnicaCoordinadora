import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PremioInterface } from 'src/app/models/premio.interface';
import { PremioService } from 'src/app/services/premio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-premio',
  templateUrl: './new-premio.component.html',
  styleUrls: ['./new-premio.component.scss']
})
export class NewPremioComponent {

  constructor(
    private router: Router,
    private api: PremioService,
  ) { }

  ngOnInit(): void {
    this.randomCode();
  }


  newForm = new FormGroup({
    idPremio: new FormControl(''),
    codigoPremio: new FormControl('', Validators.required),
    nombrePremio: new FormControl('', Validators.required),
    descPremio: new FormControl('', Validators.required),
    valorPremio: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
  })

  postForm(form: PremioInterface) {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de que deseas crear este premio?',
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.postPremio(form).subscribe(data => {
          if (data.status == 'ok') {
            this.router.navigate(['premios/list-premios']);
            Swal.fire({
              icon: 'success',
              title: 'Premio creado',
              text: 'El premio ha sido creado exitosamente.',
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

  randomCode() {
    const long = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let random = "";
    for (let i = 0; i < 6; i++) {
      random += long.charAt(Math.floor(Math.random() * long.length));
    }
    this.newForm.patchValue({ codigoPremio: random });
  }

  goBack() {
    this.router.navigate(['premios/list-premios']);
  }
}
