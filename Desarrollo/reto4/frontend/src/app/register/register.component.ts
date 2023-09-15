import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  nombreUsuario!: string;
  correoUsuario!: string;
  contrasenaUsuario!: string;

  constructor(private http: HttpClient) { }

  registerUser() {
    const data = {
      nombreUsuario: this.nombreUsuario,
      correoUsuario: this.correoUsuario,
      contrasenaUsuario: this.contrasenaUsuario
    };
    this.http.post('http://localhost:8080/auth/register', data)
      .subscribe((response: any) => {
        alert(response.msj);
      });
  }

}
