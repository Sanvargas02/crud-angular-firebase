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
    const empleadoRef = collection(this.firestore, 'empleados'); // Servicio y nombre de la colección
    return addDoc(empleadoRef, empleado); // Retorna una Promesa
  }
}
