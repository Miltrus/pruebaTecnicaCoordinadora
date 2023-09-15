import { Injectable } from '@angular/core';
import { EmpleadoInterface } from '../models/empleado.interface';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  url: string = 'http://localhost:5050/';

  constructor(private http: HttpClient) { }

  getAllEmpleados(): Observable<EmpleadoInterface[]> {
    let address = this.url + 'empleado';
    return this.http.get<EmpleadoInterface[]>(address);
  }

  getOneEmpleado(id: any): Observable<EmpleadoInterface> {
    let address = this.url + 'empleado/' + id;
    return this.http.get<EmpleadoInterface>(address);
  }

  postEmpleado(form: EmpleadoInterface): Observable<any> {
    let address = this.url + 'empleado';
    return this.http.post<any>(address, form);
  }

  putEmpleado(id: any): Observable<any> {
    let address = this.url + 'empleado/' + id;
    return this.http.put<any>(address, id);
  }

  deleteEmpleado(id: any): Observable<any> {
    let addres = this.url + 'empleado/' + id;
    return this.http.delete<any>(addres);
  }

  getPuntajeTotal(id: any): Observable<any> {
    let address = this.url + 'empleado/puntajeTotal/' + id;
    return this.http.get<any>(address);
  }
}
