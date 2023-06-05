import { Component, OnInit, ViewChild,AfterViewInit  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculosService } from 'src/app/services/vehiculos.service';

interface ConteoModelo {
  GuidRegistro: string;
  id: number;
  estacion: string;
  sentido: string;
  hora: string;
  categoria: string;
  cantidad: number;
  fecha: string;
  createdOn: string;
  modifiedOn: string;
}

@Component({
  selector: 'app-conteo',
  templateUrl: './conteo.component.html',
  styleUrls: ['./conteo.component.css']
})

export class ConteoComponent implements OnInit,AfterViewInit {

  dataSource: MatTableDataSource<ConteoModelo> = new MatTableDataSource<ConteoModelo>();

  displayedColumns: string[] = [ 'id', 'estacion', 'sentido', 'hora', 'categoria', 'cantidad', 'fecha', 'createdOn'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _tarjetaService: VehiculosService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.obtenerConteoVehiculos()
  }

  obtenerConteoVehiculos() {
    this._tarjetaService.getConteoVehiculos().subscribe(data => {
      let arrData = JSON.parse(data.data);
      this.dataSource.data = arrData;
     
    }, error => {
      console.log(error);
    })
  }
  
}
