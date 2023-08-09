import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: Firestore) { }

  //Método para generar los empleados e insertarlos en la base de datos
  //Create - C
  agregarEmpleado(empleado: any): Promise<any> {
    //Creamos una referencia a la colleción
    const empleadoRef = collection(this.firestore, 'empleados'); // Servicio y nombre de la colección
    //Añadimos en un documento la referencia y los datos que lo componen
    return addDoc(empleadoRef, empleado); // Retorna una Promesa
  }

  //Método para consumir los datos de la BD
  //Read - R
  obtenerEmpleados(): Observable<any> {
    //Creamos una referencia a la colleción de la que queremos recibir los datos
    const empleadoRef = collection(this.firestore, 'empleados');
    //Retornamos el observable que nos devuelve una función anónima en la que nos trae los datos solicitados de la colección
    return collectionData(empleadoRef, {idField: 'id'}) as Observable<any>; //Transformamos a observable
  }

}
