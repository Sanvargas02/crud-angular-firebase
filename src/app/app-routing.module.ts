import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';

//Creamos nuestras rutas para poder movernos entre componentes o entre pantallas
const routes: Routes = [
  { path: '', redirectTo: 'list-empleados', pathMatch: 'full' }, //Ruta por defecto cuando la dirección es vacía
  { path: 'list-empleados', component: ListEmpleadosComponent },
  { path: 'create-empleado', component: CreateEmpleadoComponent },
  { path: '**', redirectTo: 'list-empleados', pathMatch: 'full' } //Ruta por defecto cuando se coloca cualquier cosa
  //Se le puede colocar un componente que indique que la dirección no exíste y la opción a ir al inicio
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
