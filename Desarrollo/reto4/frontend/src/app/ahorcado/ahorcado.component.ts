import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {

  palabraOrigen: string = '';
  palabraGuiones: string = '';
  intentosRestantes: number = 6;
  letraIngresada!: string;
  letrasIngresadas: any[] = [];
  lose: boolean = false;
  win: boolean = false;
  players: any[] = [];


  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.obtenerCategoriaAleatoria();
  }

  obtenerCategoriaAleatoria() {
    this.http.get<any>('http://localhost:8080/ahorcado/categoria').subscribe(
      (data) => {
        console.log(data);
        this.obtenerPalabraAleatoria(data.idCategoria);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerPalabraAleatoria(categoriaId: number) {
    this.http.get<any>(`http://localhost:8080/ahorcado/palabra/${categoriaId}`).subscribe(
      (data) => {
        console.log(data);
        this.palabraOrigen = data.palabra;
        this.palabraGuiones = this.palabraOrigen.replace(/./g, '_ ');
      },
      (error) => {
        console.error(error);
      }
    );
  }


  adivinarLetra() {
    let coincidencia = false;

    if (this.letrasIngresadas.includes(this.letraIngresada)) {
      alert('Ya ingresaste esta letra');
      this.letraIngresada = '';
      return;
    }

    this.letrasIngresadas.push(this.letraIngresada);

    for (let i = 0; i < this.palabraOrigen.length; i++) {
      if (this.letraIngresada == this.palabraOrigen[i]) {
        coincidencia = true;
        this.palabraGuiones = this.palabraGuiones.replaceAt(i * 2, this.letraIngresada);
      }
    }

    if (!coincidencia) {
      this.intentosRestantes--;
    }

    if (this.intentosRestantes == 0) {
      this.lose = true;
    }

    if (this.palabraGuiones.indexOf('_') < 0) {
      this.win = true;
    }

    if (this.win || this.lose) {
      const fecha = new Date
      const fehcaFormateada = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate() + ' ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();

      const puntaje = {
        idUsuario: parseInt(localStorage.getItem('uid')!),
        juego: 'Ahorcado',
        puntaje: this.intentosRestantes,
        intentos: 6 - this.intentosRestantes,
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

    this.letraIngresada = '';
  }

  reiniciarJuego() {
    this.palabraOrigen = '';
    this.palabraGuiones = '';
    this.intentosRestantes = 6;
    this.letraIngresada = '';
    this.letrasIngresadas = [];
    this.lose = false;
    this.win = false;
    this.obtenerCategoriaAleatoria();
  }

}


declare global {
  interface String {
    replaceAt(index: number, replacement: string): string;
  }
}

String.prototype.replaceAt = function (index: number, replacement: string): string {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
