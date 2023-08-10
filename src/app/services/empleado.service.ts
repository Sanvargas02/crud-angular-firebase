import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy, limit, doc, deleteDoc, onSnapshot, getDoc } from '@angular/fire/firestore';
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
    //return collectionData(empleadoRef, {idField: 'id'}) as Observable<any>; //Transformamos a observable

    //Ordenamos los datos que queremos traer de la colleción usando orderBy y limit en un query
    //El query nos sirve para organizar los datos que queremos traer de la BD
    const q = query(empleadoRef, orderBy("fechaCreacion", "asc"));
    return collectionData( q, {idField: 'id'}) as Observable<any>;
  }


  //Método para eliminar datos de la BD
  //Delete - D
  //Aquí podemos elegir pasar como parámetro el objeto entero con todos los elementos ó sólo el elemento con el que queremos crear la referencia para borrar
  //En este caso pasamos el objeto con todos los elementos
  borrarEmpelado(empleado: any): Promise<any> {
    //Creamos la referencia al documento que queremos borrar
    const docRef = doc(this.firestore, `empleados/${empleado.id}`); // Borramos por id
    return deleteDoc(docRef); // Nos retorna una promesa
  }


  //Método para Editar un Empleado - Se trae un documento desde la BD y luego hacemos la lógica para modificarlo
  //Update - U
  editarEmpleado(id: string)  {
    //Creamos la referencia al documento que queremos editar
    const docRef = doc(this.firestore, `empleados/${id}`);
    //Primero obtenemos el Documento a editar
    return getDoc(docRef); //Retorna una promesa
    //return onSnapshot(docRef, (doc) => { console.log(doc.get) })
  }

}
