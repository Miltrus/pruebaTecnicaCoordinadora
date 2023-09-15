import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-piedrapapeltijera',
  templateUrl: './piedrapapeltijera.component.html',
  styleUrls: ['./piedrapapeltijera.component.scss']
})
export class PiedraPapelTijeraComponent {

  opciones = ['piedra', 'papel', 'tijera'];
  eleccionUser!: string;
  eleccionPc!: string;
  resultado!: string;
  contEmpate: number = 0;
  contWin: number = 0;
  contLose: number = 0;

  players: any[] = [];

  juegoFin = false;

  constructor(private http: HttpClient) { }

  jugar(opcionUsuario: string): void {

    this.eleccionUser = opcionUsuario;
    this.eleccionPc = this.opciones[Math.floor(Math.random() * this.opciones.length)];

    if (this.eleccionUser == this.eleccionPc) {
      this.resultado = 'Empate';
      this.contEmpate++;
    } else if (
      (this.eleccionUser == 'piedra' && this.eleccionPc == 'tijera') ||
      (this.eleccionUser == 'papel' && this.eleccionPc == 'piedra') ||
      (this.eleccionUser == 'tijera' && this.eleccionPc == 'papel')
    ) {
      this.resultado = 'Ganaste';
      this.contWin++;
    } else {
      this.resultado = 'Perdiste';
      this.contLose++;
    }
  }

  endGame() {
    this.juegoFin = true;
    const fecha = new Date
    const fehcaFormateada = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate() + ' ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();

    const puntaje = {
      idUsuario: parseInt(localStorage.getItem('uid')!),
      juego: 'PiedraPapelTijera',
      puntaje: this.contWin - this.contLose,
      intentos: this.contWin + this.contLose + this.contEmpate,
      fecha: fehcaFormateada
    }

    this.http.post('http://localhost:8080/puntaje', puntaje).subscribe((response: any) => {
      console.log(response);
      this.http.get('http://localhost:8080/puntaje/ranking/' + puntaje.juego)
        .subscribe((response: any) => {
          if (response.status == 'ok') {
            this.players = response.ranking;
            console.log(this.players);
          } else {
            console.error('Error al obtener el ranking:', response.msj);
          }
        });
    });

  }

}
