import { Injectable } from '@angular/core';
import { PremioInterface } from '../models/premio.interface';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PremioService {

  url: string = 'http://localhost:5050/';

  constructor(private http: HttpClient) { }

  getAllPremios(): Observable<PremioInterface[]> {
    let address = this.url + 'premio';
    return this.http.get<PremioInterface[]>(address);
  }

  getOnePremio(id: any): Observable<PremioInterface> {
    let address = this.url + 'premio/' + id;
    return this.http.get<PremioInterface>(address);
  }

  postPremio(form: PremioInterface): Observable<any> {
    let address = this.url + 'premio';
    return this.http.post<any>(address, form);
  }

  putPremio(id: any): Observable<any> {
    let address = this.url + 'premio/' + id;
    return this.http.put<any>(address, id);
  }

  deletePremio(id: any): Observable<any> {
    let addres = this.url + 'premio/' + id;
    return this.http.delete<any>(addres);
  }
}
