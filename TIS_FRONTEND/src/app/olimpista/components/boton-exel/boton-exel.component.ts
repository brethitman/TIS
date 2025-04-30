import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-boton-exel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boton-exel.component.html',
})
export class BotonExelComponent {

  datosExcel: any[][] = [];

  onFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) {
      console.error('Selecciona un solo archivo Excel.');
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const nombreHoja: string = workbook.SheetNames[0];
      const hoja = workbook.Sheets[nombreHoja];

      const datos: any[][] = XLSX.utils.sheet_to_json(hoja, { header: 1 });
      this.datosExcel = datos;
    };

    reader.readAsBinaryString(target.files[0]);
  }
}
