import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

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
}
