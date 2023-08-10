import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {

  createEmpleado: FormGroup; //Formulario
  submitted = false; //Para saber si se envió el form
  loading = false; //Para el Spinner

  //Lógica para Editar
  id: string | null; // Cuando sea el componente sea de lógica editar el id va a ser de tipo string y cuando el componente sea de lógica crear va a ser de tipo null. Esto no se tiene que hacer en caso de que utilizemos componentes aparte para cada lógica
  titulo = 'Agregar Empleado'; //El título del h3 en el template

  constructor(
    private fb: FormBuilder, // Inyección de Modulo para Formulario
    private empleadoService: EmpleadoService, // Servicio para conectar con Firebase
    private router: Router, // Clase Router para moverme a otro componente una vez enviado el form
    private aRoute: ActivatedRoute // Clase que nos ayuda a conseguir información de la URL
    ) {
    // Lógica de Formulario
    this.createEmpleado = fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]
    })

    // Lógica para Editar
    this.id = this.aRoute.snapshot.paramMap.get('id'); // En get() se coloca el nombre de el dato que pusimos en la URL del app-routing
    //console.log(this.id); //Verificamos que lo tenemos
  }

  //Aquí llamamos el código que queremos ejecutar antes de que se inicie el componente, muy útil
  ngOnInit(): void {
    // Lógica para Editar
    this.editEmpleado(); //Llamamos nuestro método para ejecutar la lógica de editar empleado apenas se cargue el componente
  }

  //Método para ingresar un empleado nuevo
  agregarEmpleado() {
    this.submitted = true;
    // Si el formulario de crear empleado es invalido (Cuando no se llenan los campos en este caso) se retorna y no ejecuta codigo más allá del if
    if(this.createEmpleado.invalid) {
      return ;
    }

    this.loading = true;//Se empieza a mostrar el Spinner

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
      //Mensaje
      alert('El empleado fue registrado con éxito');
      //Limpiar el formulario
      this.submitted = false; // Para evitar que la validación del ngIf se dispare al limpiar con reset()
      this.createEmpleado.reset(); // Al limpiar los campos hace que se coloque inválido el formulario
      //Nos direcciona a otro componente
      this.loading = false // Pausa el Spinner
      this.router.navigate(['/list-empleados']);
    })
    .catch(error => {
      console.log(error);
      this.loading = false // Pausa el Spinner
    })
  }

  // Lógica para Editar
  //Método para Editar un Empleado
  editEmpleado() {
    this.titulo = 'Editar Empleado'; //Cambiar el mensaje en el h3 del html
    //Sólo se ejecuta esta lógica en caso de que el id no sea null
    if(this.id !== null) {
      // Pasamos el id que traemos desde la URL, el que fue seleccionado
      this.empleadoService.editarEmpleado(this.id)
      .then(
        //Con data.data() traemos todo un documento
        data => {console.log(data.data()?.['nombre']) //Sintaxis para traer un documento específico
        //Ahora procedemos a rellenar los campos de nuestro formulario en el html

      })
      .catch(error => {console.log(error)})
    }
  }

}
