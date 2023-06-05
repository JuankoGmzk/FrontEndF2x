import { Component, OnInit, ViewChild,AfterViewInit  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculosService } from 'src/app/services/vehiculos.service';

interface RecuadoModelo {
  GuidRegistro: string;
  id: number;
  estacion: string;
  sentido: string;
  hora: string;
  categoria: string;
  valorTabulado: number;
  fecha: string;
  createdOn: string;
  modifiedOn: string;
}

@Component({
  selector: 'app-recaudo',
  templateUrl: './recaudo.component.html',
  styleUrls: ['./recaudo.component.css']
})

export class RecaudoComponent implements OnInit,AfterViewInit{

  dataSource: MatTableDataSource<RecuadoModelo> = new MatTableDataSource<RecuadoModelo>();
  displayedColumns: string[] = [ 'id', 'estacion', 'sentido', 'hora', 'categoria', 'valorTabulado', 'fecha', 'createdOn'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _tarjetaService: VehiculosService) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.obtenerRecaudoVehiculos()
  }

  obtenerRecaudoVehiculos() {
    this._tarjetaService.getRecaudoVehiculos().subscribe(data => {
      let arrData = JSON.parse(data.data);
      this.dataSource.data = arrData;
    }, error => {
      console.log(error);
    })
  }

}
