import { Component,OnInit,AfterViewInit  } from '@angular/core';
import { VehiculosService } from 'src/app/services/vehiculos.service';


interface EstacionData {
  estacion: string;
  ValorTotal: string;
  ConteoTotal: string;
}

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  constructor(private _ReporteService: VehiculosService) {} 

  totalConteo = 0;
  totalRecaudo = 0;

  reporteData = [
    {
      fecha: '2021-07-02',
      estaciones: [
        { estacion: 'FUSCA', ValorTotal: '35718400', ConteoTotal: '3731' },
        { estacion: 'ANDES', ValorTotal: '442940400', ConteoTotal: '40679' },
        { estacion: 'UNISABANA', ValorTotal: '10686500', ConteoTotal: '244' }
      ]
    }
  ];

  estaciones: string[] = [];

  ngOnInit(): void {
    // Obtener todas las estaciones
    this.obtenerReporteVehiculos();
    this.getEstaciones();
  }
 
  obtenerReporteVehiculos() {
    this._ReporteService.getReporteVehiculos().subscribe(data => {
      let arrData = JSON.parse(data.data);
      this.reporteData = arrData;

      this.getTotalValorTotal();
      this.getTotalConteoTotal();
     
    }, error => {
      console.log(error);
    })
  }

  getEstaciones(): void {
    const estacionesSet = new Set<string>();
    this.reporteData.forEach(item => {
      item.estaciones.forEach(estacion => {
        estacionesSet.add(estacion.estacion);
      });
    });
    this.estaciones = Array.from(estacionesSet);
  }

  hasEstacion(estaciones: EstacionData[], estacion: string): boolean {
    return estaciones.some(item => item.estacion === estacion);
  }

  getValorTotal(estaciones: EstacionData[], estacion: string): string {
    const item = estaciones.find(item => item.estacion === estacion);
    return item ? item.ValorTotal : '-';
  }

  getConteoTotal(estaciones: EstacionData[], estacion: string): string {
    const item = estaciones.find(item => item.estacion === estacion);
    return item ? item.ConteoTotal : '-';
  }

  getTotalValorTotal(): void {
    this.reporteData.forEach(item => {
      item.estaciones.forEach(estacion => {
        this.totalRecaudo += parseInt(estacion.ValorTotal, 10);
      });
    });
  }
  
  getTotalConteoTotal(): void {
    this.reporteData.forEach(item => {
      item.estaciones.forEach(estacion => {
        this.totalConteo += parseInt(estacion.ConteoTotal, 10);
      });
    });
  }

}
