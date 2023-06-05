import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private myAppUrl = 'https://localhost:7148/';

  private username = 'ApiSecuryUserName';
  private password = 'ApiSecuryPassWord123';

  // Construir la cabecera de autorización
  private headers = new HttpHeaders().set(
    'Authorization',
    'Basic ' + btoa(this.username + ':' + this.password)
  );

  constructor(private http: HttpClient) { }

  getConteoVehiculos(): Observable<any> {
    const options = {
      headers: this.headers,
      responseType: 'json' as const
    };
    return this.http.get(this.myAppUrl + 'api/Vehiculos/AllVehiculosConteoDB', options);
  }

  getRecaudoVehiculos(): Observable<any> {
    const options = {
      headers: this.headers,
      responseType: 'json' as const
    };
    return this.http.get(this.myAppUrl + 'api/Vehiculos/AllVehiculosRecaudoDB', options);
  }

  getReporteVehiculos(): Observable<any> {
    const options = {
      headers: this.headers,
      responseType: 'json' as const
    };
    return this.http.get(this.myAppUrl + 'api/Vehiculos/ReporteDB', options);
  }

}
