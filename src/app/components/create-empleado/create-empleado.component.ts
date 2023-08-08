import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent {

  createEmpleado: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.createEmpleado = fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  agregarEmpleado() {
    this.submitted = true;
    // Si el formulario de crear empleado es invalido (Cuando no se llenan los campos en este caso) se retorna y no ejecuta codigo más allá del if
    if(this.createEmpleado.invalid) {
      return ;
    }
    //Aquí podríamos usar una Interfaz
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    //empleado es el objeto que le vamos a pasar a firebase
    console.log(empleado);
  }

}
