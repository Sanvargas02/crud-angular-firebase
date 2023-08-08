import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = []; // Para recoger los datos del Observable y luego pasarlo al html para mostrar

  constructor(
    private empleadoService: EmpleadoService //Inyectamos el servicio
  ) {}

    ngOnInit(): void {
      this.getEmpleados(); // Se ejecuta antes de que el componente cargue
    }

  //Método para obtener los empleados de la BD
  getEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe(data => {
      //console.log(data); //Nos muestra qué nos trae desde la base de Datos
      //Data nos trae un arreglo con el conjunto de elemento de tipo Object - Arreglo de Objetos
      //Podemos Manipular el arreglo y ser selectivos con los elemento usando ciclos de Js y condicionales
      data.forEach((element:any) => {
        //console.log(element.id); //En este caso estoy recogiendo sólo los id
        console.log(element); //En este caso recogo todos los elementos - Objeto por Objeto
      })
    })
  }

}
