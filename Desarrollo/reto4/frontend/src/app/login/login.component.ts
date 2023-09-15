import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  nombreUsuario!: string;
  correoUsuario!: string;
  contrasenaUsuario!: string;

  constructor(private http: HttpClient) { }

  login() {
    const data = {
      correoUsuario: this.correoUsuario,
      contrasenaUsuario: this.contrasenaUsuario
    };
    this.http.post('http://localhost:8080/auth/login', data)
      .subscribe((response: any) => {
        console.log(response);
        alert(response.msj);

        if (response.status == "ok") {
          window.location.href = "/menu";
          localStorage.setItem('uid', response.user.idUsuario);
        }
      });
  }
}
