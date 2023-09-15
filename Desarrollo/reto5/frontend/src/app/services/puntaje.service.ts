import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PuntajeInterface } from '../models/puntaje.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  url: string = 'http://localhost:5050/';

  constructor(private http: HttpClient) { }

  getAllPuntajes(): Observable<PuntajeInterface[]> {
    let address = this.url + 'puntaje';
    return this.http.get<PuntajeInterface[]>(address);
  }

  getOnePuntaje(id: any): Observable<PuntajeInterface> {
    let address = this.url + 'puntaje/' + id;
    return this.http.get<PuntajeInterface>(address);
  }

  postPuntaje(form: PuntajeInterface): Observable<any> {
    let address = this.url + 'puntaje';
    return this.http.post<any>(address, form);
  }

  putPuntaje(id: any): Observable<any> {
    let address = this.url + 'puntaje/' + id;
    return this.http.put<any>(address, id);
  }

  deletePuntaje(id: any): Observable<any> {
    let addres = this.url + 'puntaje/' + id;
    return this.http.delete<any>(addres);
  }
}
