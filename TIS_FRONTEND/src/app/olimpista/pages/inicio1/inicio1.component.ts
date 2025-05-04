import { Component } from '@angular/core';
// Importa CommonModule si usas directivas como *ngIf, *ngFor en inicio1.component.html
import { CommonModule } from '@angular/common';
// Asegúrate de que la ruta a tu componente InscripcionTodoComponent sea correcta
import { InscripcionTodoComponent } from '../../components/inscripcion-todo/inscripcion-todo.component';
import { BoletaPagoComponent } from "../../components/boleta-pago/boleta-pago.component";

@Component({
  selector: 'app-inicio1',
  standalone: true, // <--- Asegúrate de que Inicio1Component también sea standalone
  imports: [
    CommonModule, // <--- Añade CommonModule si lo necesitas en esta plantilla
  /*  InscripcionTodoComponent*/ // <-- ¡Tienes que importar InscripcionTodoComponent aquí!

],
  templateUrl: './inicio1.component.html',

})
export class Inicio1Component {

}
