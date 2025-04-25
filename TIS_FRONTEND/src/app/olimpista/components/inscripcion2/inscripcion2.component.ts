import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-inscripcion2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscripcion2.component.html'
})
export class Inscripcion2Component {
  olimpistaData = {
    nombres: '',
    apellidos: '',
    ci: '',
    fecha_nacimiento: '',
    correo: '',
    telefono: '',
    colegio: '',
    curso: '',
    departamento: '',
    provincia: ''
  };

  // Variables para el manejo de Excel
  archivoSeleccionado: File | null = null;
  modalVisible = false;
  archivoInvalido = false;
  mensajeError = 'Por favor, selecciona un archivo válido (.xlsx, .xls, .csv)';

  // Variables para la vista previa del archivo
  archivoPreview: any[] = [];
  archivoHeaders: string[] = [];
  archivoRows: number = 0;

  // Variables para datos cargados del Excel
  excelData: any[] = [];

  // Encabezados simplificados para la plantilla CSV
  readonly encabezadosExcel = [
    'Nombre del estudiante',
    'Apellido del estudiante',
    'CI'
  ];

  @Output() continuar = new EventEmitter<void>();
  @Output() atras = new EventEmitter<void>();
  @Output() olimpistaChanged = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  onOlimpistaChange() {
    this.olimpistaChanged.emit(this.olimpistaData);
  }

  siguiente() {
    if (this.validarDatos()) {
      this.onOlimpistaChange();
      this.continuar.emit();
    }
  }

  volver() {
    this.atras.emit();
  }

  validarDatos(): boolean {
    // Validar si hay datos en el formulario individual o datos cargados por Excel
    return (!!this.olimpistaData.nombres && 
           !!this.olimpistaData.apellidos && 
           !!this.olimpistaData.ci) || 
           (this.excelData && this.excelData.length > 0);
  }

  // Métodos para el modal de Excel
  abrirModalExcel() {
    this.modalVisible = true;
    this.archivoPreview = [];
    this.archivoHeaders = [];
    this.archivoInvalido = false;
    this.mensajeError = '';
  }

  cerrarModal() {
    this.modalVisible = false;
    this.archivoInvalido = false;
    this.archivoPreview = [];
    this.archivoHeaders = [];
  }

  seleccionarArchivo() {
    const input = document.getElementById('archivoExcel') as HTMLInputElement;
    if (input) {
      input.value = ''; // Resetear el input para permitir seleccionar el mismo archivo nuevamente
      input.click();
    }
  }

  archivoElegido(event: any) {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return; // No se seleccionó ningún archivo
    }
    
    const file = files[0];
    if (file) {
      // Validar que sea un archivo Excel o CSV
      const extensionesValidas = ['.xlsx', '.xls', '.csv'];
      const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (extensionesValidas.includes(extension)) {
        this.archivoSeleccionado = file;
        this.archivoInvalido = false;
        this.mensajeError = '';
        this.leerArchivo(file);
      } else {
        this.archivoSeleccionado = null;
        this.archivoInvalido = true;
        this.mensajeError = 'Por favor, selecciona un archivo válido (.xlsx, .xls, .csv)';
        this.archivoPreview = [];
        this.archivoHeaders = [];
      }
    }
  }

  // Método para leer y mostrar vista previa del archivo
  leerArchivo(file: File) {
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        
        if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
          this.archivoInvalido = true;
          this.mensajeError = 'El archivo no contiene hojas de cálculo válidas';
          return;
        }
        
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        if (!worksheet) {
          this.archivoInvalido = true;
          this.mensajeError = 'No se pudo leer la hoja de cálculo';
          return;
        }
        
        // Convertir a JSON con manejo de errores
        let jsonData: any[] = [];
        try {
          jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: '' });
        } catch (err) {
          console.error('Error al convertir Excel a JSON:', err);
          this.archivoInvalido = true;
          this.mensajeError = 'Error al procesar el archivo. Formato no válido.';
          return;
        }
        
        // Verificar si hay datos
        if (!jsonData || jsonData.length === 0) {
          this.archivoInvalido = true;
          this.mensajeError = 'El archivo no contiene datos o está vacío';
          return;
        }

        // Verificar si el primer elemento existe y tiene propiedades
        if (!jsonData[0] || typeof jsonData[0] !== 'object') {
          this.archivoInvalido = true;
          this.mensajeError = 'El formato del archivo no es válido';
          return;
        }
        
        // Ahora podemos obtener las cabeceras con seguridad
        const headers = Object.keys(jsonData[0]);
        
        if (headers.length === 0) {
          this.archivoInvalido = true;
          this.mensajeError = 'El archivo no contiene columnas válidas';
          return;
        }
        
        // Validar encabezados requeridos
        const requiredHeaders = this.encabezadosExcel;
        const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
        
        if (missingHeaders.length > 0) {
          this.archivoInvalido = true;
          this.mensajeError = `Faltan columnas requeridas: ${missingHeaders.join(', ')}`;
          return;
        }
        
        // Mostrar vista previa (máximo 5 filas)
        this.archivoRows = jsonData.length;
        this.archivoHeaders = headers;
        this.archivoPreview = jsonData.slice(0, Math.min(5, jsonData.length));
        
      } catch (error) {
        console.error('Error al leer el archivo', error);
        this.archivoInvalido = true;
        this.mensajeError = 'Error al procesar el archivo. Verifica el formato.';
        this.archivoPreview = [];
        this.archivoHeaders = [];
      }
    };
    
    reader.onerror = (error) => {
      console.error('Error al leer el archivo', error);
      this.archivoInvalido = true;
      this.mensajeError = 'Error al leer el archivo';
      this.archivoPreview = [];
      this.archivoHeaders = [];
    };
    
    try {
      reader.readAsBinaryString(file);
    } catch (error) {
      console.error('Error al iniciar la lectura del archivo', error);
      this.archivoInvalido = true;
      this.mensajeError = 'Error al acceder al archivo';
      this.archivoPreview = [];
      this.archivoHeaders = [];
    }
  }

  subirArchivo() {
    if (!this.archivoSeleccionado || this.archivoInvalido) return;

    const formData = new FormData();
    formData.append('archivo', this.archivoSeleccionado);
    
    // Opción 2: Procesar localmente (simulando respuesta del servidor)
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        
        if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
          alert('El archivo no contiene hojas de cálculo válidas');
          return;
        }
        
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        if (!worksheet) {
          alert('No se pudo leer la hoja de cálculo');
          return;
        }
        
        // Convertir a JSON de manera segura
        let jsonData: any[] = [];
        try {
          jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: '' });
        } catch (err) {
          console.error('Error al convertir Excel a JSON:', err);
          alert('Error al procesar el archivo. Formato no válido.');
          return;
        }
        
        if (!jsonData || jsonData.length === 0) {
          alert('El archivo no contiene datos válidos');
          return;
        }
        
        // Validar que todos los registros tengan las columnas requeridas
        const requiredHeaders = this.encabezadosExcel;
        const invalidRows = jsonData.filter(row => 
          !row['Nombre del estudiante'] || 
          !row['Apellido del estudiante'] || 
          !row['CI']
        );
        
        if (invalidRows.length > 0) {
          alert(`Hay ${invalidRows.length} filas con datos incompletos. Por favor, revisa el archivo.`);
          return;
        }
        
        // Guardar los datos
        this.excelData = jsonData;
        
        // Si hay al menos un registro, completar el formulario con el primer registro
        if (this.excelData.length > 0) {
          const primerRegistro = this.excelData[0];
          this.olimpistaData.nombres = primerRegistro['Nombre del estudiante'] || '';
          this.olimpistaData.apellidos = primerRegistro['Apellido del estudiante'] || '';
          this.olimpistaData.ci = primerRegistro['CI'] || '';
        }
        
        this.cerrarModal();
        console.log("Datos cargados:", this.excelData);
        
      } catch (error) {
        console.error('Error al procesar el archivo', error);
        alert('Error al procesar el archivo');
      }
    };
    
    reader.onerror = (error) => {
      console.error('Error al leer el archivo', error);
      alert('Error al leer el archivo');
    };
    
    try {
      reader.readAsBinaryString(this.archivoSeleccionado);
    } catch (error) {
      console.error('Error al iniciar la lectura del archivo', error);
      alert('Error al acceder al archivo');
    }
    
    /* Opción 1: Enviar al servidor (descomentar para usar)
    this.http.post('/olimpistaExel', formData)
      .subscribe({
        next: (response: any) => {
          console.log('Respuesta del servidor:', response);
          
          if (response && response.data) {
            this.excelData = response.data;
            
            // Si hay al menos un registro, completar el formulario con el primer registro
            if (this.excelData.length > 0) {
              const primerRegistro = this.excelData[0];
              this.olimpistaData.nombres = primerRegistro['Nombre del estudiante'] || '';
              this.olimpistaData.apellidos = primerRegistro['Apellido del estudiante'] || '';
              this.olimpistaData.ci = primerRegistro['CI'] || '';
            }
          }
          
          this.cerrarModal();
          alert('Archivo subido exitosamente');
        },
        error: (error) => {
          console.error('Error al subir el archivo', error);
          alert('Error al subir el archivo');
        }
      });
    */
  }

  // Método para limpiar datos cargados del Excel
  limpiarDatosExcel() {
    this.excelData = [];
    // Si se desea, también se puede resetear el formulario
    // this.olimpistaData = { 
    //   nombres: '', apellidos: '', ci: '', fecha_nacimiento: '', 
    //   correo: '', telefono: '', colegio: '', curso: '', 
    //   departamento: '', provincia: '' 
    // };
  }

  // Método para descargar plantilla CSV con encabezados simplificados
  descargarPlantilla() {
    try {
      // Crear contenido CSV con encabezados
      let csvContent = this.encabezadosExcel.join(',') + '\n';
      
      // Añadir una fila de ejemplo
      csvContent += 'Juan,Pérez,12345678\n';
      
      // Crear blob (archivo binario)
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // Crear enlace de descarga
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', 'plantilla_estudiantes.csv');
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Limpiar URL creada
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
      
    } catch (error) {
      console.error('Error al descargar la plantilla:', error);
      alert('Error al descargar la plantilla');
    }
  }
}