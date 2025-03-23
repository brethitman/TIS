import { Component, Input } from '@angular/core';
import { Area } from '../../interfaces/inscripcion.interface';
import { CommonModule } from '@angular/common';
import { NivelesCategoria } from '../../interfaces/categoria.interface';
import { CategoriaService } from '../../service/categoria.service'; // Asegúrate de tener este servicio creado
import { FormsModule } from '@angular/forms'; // Para usar ngModel en el modal


@Component({
  selector: 'app-areas-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './areas-card.component.html',
})
export class AreasCardComponent {
      @Input({required:true})
      Area!:Area;
      @Input() categorias: NivelesCategoria[] = [];

      isModalOpen = false;

      categoriaNombre: string = '';
      categoriaNivel: string = '';
      categoriaFechaExamen: string = ''; // formato YYYY-MM-DD
      categoriaCosto: string = '';
    
      constructor(private categoriaService: CategoriaService) {}

      openModal() {
        this.isModalOpen = true; 
      }
    
      closeModal() {
        this.isModalOpen = false;
        this.resetCategoriaForm();

        
      }
    
      saveCategory() {
        if (
          !this.categoriaNombre.trim() ||
          !this.categoriaNivel ||
          !this.categoriaFechaExamen ||
          !this.categoriaCosto.trim()
        ) {
          alert('Por favor, completa todos los campos.');
          return;
        }
    
        // Combinar el nombre y el nivel académico para formar el nombre final de la categoría
        const nombreFinal = `${this.categoriaNombre} - ${this.categoriaNivel}`;
    
        // Crear el objeto NivelesCategoria
        const nuevaCategoria: NivelesCategoria = {
          id: 0, // El backend asignará el id definitivo
          nombre: nombreFinal,
          fecha_examen: new Date(this.categoriaFechaExamen),
          costo: this.categoriaCosto,
          habilitacion: true, // Puedes ajustar este valor según tus requerimientos
          createdAt: new Date(),
          updatedAt: new Date(),
        };
    
        // Enviar la categoría al backend
        this.categoriaService.createCategoria(nuevaCategoria).subscribe({
          next: (response) => {
            console.log('Categoría guardada:', response);
            alert('Categoría guardada con éxito');
            // Agregar la nueva categoría a la lista para actualizar la vista
            this.categorias.push(response);
            this.closeModal();
          },
          error: (error) => {
            console.error('Error al guardar la categoría:', error);
            alert('Error al guardar la categoría: ' + (error.message || 'Error desconocido'));
          },
        });
      }
    
      resetCategoriaForm() {
        this.categoriaNombre = '';
        this.categoriaNivel = '';
        this.categoriaFechaExamen = '';
        this.categoriaCosto = '';
      }

}
