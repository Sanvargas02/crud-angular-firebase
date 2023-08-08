import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent {

  createEmpleado: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder, // Inyección de Modulo para Formulario
    private empleadoService: EmpleadoService // Servicio para conectar con Firebase
    ) {
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
    //empleado es el objeto que le vamos a pasar a firebase
    //No pasamos directamente el createEmpleado ya que empleado tiene otros valores adicionales
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    // Utilizamos el servico para conectar con Firebase
    this.empleadoService.agregarEmpleado(empleado)
    .then(() => {
      console.log('empleado Registrado con éxito');
      //Limpiar el formulario
      this.submitted = false; // Para evitar que la validación del ngIf se dispare al limpiar con reset()
      this.createEmpleado.reset(); // Al limpiar los campos hace que se coloque inválido el formulario
    })
    .catch(error => {
      console.log(error);
    })
  }

}
