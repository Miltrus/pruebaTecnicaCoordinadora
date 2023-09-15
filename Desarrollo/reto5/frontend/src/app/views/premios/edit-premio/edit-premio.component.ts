import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PremioService } from 'src/app/services/premio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-premio',
  templateUrl: './edit-premio.component.html',
  styleUrls: ['./edit-premio.component.scss']
})
export class EditPremioComponent {

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private api: PremioService,
  ) { }

  dataPremio: any;

  editForm = new FormGroup({
    idPremio: new FormControl(''),
    codigoPremio: new FormControl('', Validators.required),
    nombrePremio: new FormControl('', Validators.required),
    descPremio: new FormControl('', Validators.required),
    valorPremio: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
  });

  ngOnInit(): void {
    let idPremio = this.activatedRouter.snapshot.paramMap.get('id');

    this.api.getOnePremio(idPremio).subscribe((data: any) => {
      this.dataPremio = data;
      this.editForm.setValue({
        'idPremio': this.dataPremio.idPremio || '',
        'codigoPremio': this.dataPremio.codigoPremio || '',
        'nombrePremio': this.dataPremio.nombrePremio || '',
        'descPremio': this.dataPremio.descPremio || '',
        'valorPremio': this.dataPremio.valorPremio || '',
      });
    });
  }


  postForm(id: any) {
    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que deseas modificar este premio?',
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.putPremio(id).subscribe(
          (data) => {
            if (data.status == 'ok') {
              this.router.navigate(['premios/list-premios']);
              Swal.fire({
                icon: 'success',
                title: 'Premio modificado',
                text: 'El premio ha sido modificado exitosamente.',
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

  randomCode() {
    const long = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let random = "";
    for (let i = 0; i < 6; i++) {
      random += long.charAt(Math.floor(Math.random() * long.length));
    }
    this.editForm.patchValue({ codigoPremio: random });
  }

  goBack() {
    this.router.navigate(['premios/list-premios']);
  }
}
