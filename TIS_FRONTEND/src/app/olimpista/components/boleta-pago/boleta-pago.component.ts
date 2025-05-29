import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { BoletaPagoResponse } from '../../interfaces/inscripcion.types';
import { EmailService } from '../../service/email.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

declare const pdfMake: any;
import 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-boleta-pago',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './boleta-pago.component.html',
  providers: [DatePipe, CurrencyPipe, EmailService]
})
export class BoletaPagoComponent implements OnChanges {
  @Input() boletaData!: BoletaPagoResponse;
  apiBaseUrl: string = environment.apiUrl;

  envioExitoso: boolean | null = null;
  mensajeEnvio: string = '';

  constructor(
    // Inyecta los pipes para formatear la fecha y la moneda
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private emailService: EmailService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['boletaData']?.currentValue) {
      console.log('Datos de boleta actualizados:', this.boletaData);
    }
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || 'N/A';
  }

  formatCurrency(amount: string): string {
    try {
      const numericAmount = parseFloat(amount);
      return `Bs. ${numericAmount.toFixed(2)}`;
    } catch (error) {
      console.error('Error formateando moneda:', amount);
      return 'N/A';
    }
  }

  generatePdfBoleta(): void {
    try {
      if (!this.boletaData?.id) {
        throw new Error('Datos de boleta inválidos o incompletos');
      }

      // Validar campos requeridos
      const requiredFields: (keyof BoletaPagoResponse)[] = [
        'numero_boleta',
        'monto',
        'fecha_generacion',
        'nombre_olimpiada'
      ];

      requiredFields.forEach(field => {
        if (!this.boletaData[field]) {
          throw new Error(`Campo requerido faltante: ${field}`);
        }
      });

      // Definición del documento PDF estilizado
      const pdfDefinition: any = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 60],
        content: [
          // Encabezado
          {
            columns: [
              {
                width: '*',
                stack: [
                  {
                    text: this.boletaData.nombre_olimpiada,
                    style: 'headerTitle'
                  },
                  {
                    text: 'Universidad Mayor de San Simon',
                    style: 'headerSubtitle'
                  }
                ]
              },
              {
                width: 'auto',
                stack: [
                  {
                    text: 'N° de Boleta',
                    style: 'boletaLabel'
                  },
                  {
                    text: this.boletaData.numero_boleta || '0000',
                    style: 'boletaNumber'
                  }
                ],
                margin: [0, 0, 0, 0]
              }
            ]
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0, y1: 5,
                x2: 515, y2: 5,
                lineWidth: 2,
                lineColor: '#1e40af'
              }
            ],
            margin: [0, 10, 0, 20]
          },

          // Información de Pago y Monto
          {
            columns: [
              {
                width: '*',
                stack: [
                  {
                    text: 'Información de Pago',
                    style: 'sectionHeader'
                  },
                  {
                    table: {
                      widths: ['50%', '50%'],
                      body: [
                        [
                          { text: 'Fecha de Emisión:', style: 'tableLabel' },
                          { text: this.formatDate(this.boletaData.fecha_generacion), style: 'tableValue' }
                        ],
                        [
                          { text: 'Estado:', style: 'tableLabel' },
                          { text: 'Pendiente de Pago', style: 'tableValueGreen' }
                        ]
                      ]
                    },
                    layout: {
                      hLineWidth: () => 0,
                      vLineWidth: () => 0,
                      paddingTop: () => 5,
                      paddingBottom: () => 5
                    }
                  }
                ],
                margin: [0, 0, 10, 0]
              },
              {
                width: '*',
                stack: [
                  {
                    text: 'Monto Total',
                    style: 'sectionHeader'
                  },
                  {
                    text: this.formatCurrency(this.boletaData.monto),
                    style: 'montoTotal'
                  }
                ],
                margin: [10, 0, 0, 0]
              }
            ],
            margin: [0, 0, 0, 20]
          },

          // Datos del Participante
          {
            stack: [
              {
                text: 'Datos del Participante',
                style: 'sectionHeader',
                margin: [0, 0, 0, 10]
              },
              {
                table: {
                  widths: ['50%', '50%'],
                  body: [
                    [
                      [
                        { text: 'Nombre Completo', style: 'fieldLabel' },
                        { text: `${this.boletaData.olimpista.nombres} ${this.boletaData.olimpista.apellidos}`, style: 'fieldValue' }
                      ],
                      [
                        { text: 'Carnet de Identidad', style: 'fieldLabel' },
                        { text: this.boletaData.olimpista.ci, style: 'fieldValue' }
                      ]
                    ],
                    [
                      [
                        { text: 'Institución Educativa', style: 'fieldLabel' },
                        { text: this.boletaData.olimpista.colegio, style: 'fieldValue' }
                      ],
                      [
                        { text: 'Ubicación', style: 'fieldLabel' },
                        { text: `${this.boletaData.olimpista.departamento} - ${this.boletaData.olimpista.provincia}`, style: 'fieldValue' }
                      ]
                    ]
                  ]
                },
                layout: {
                  hLineWidth: () => 0,
                  vLineWidth: () => 0,
                  paddingTop: () => 8,
                  paddingBottom: () => 8
                }
              }
            ],
            margin: [0, 0, 0, 20]
          },

          // Datos del Tutor
          {
            stack: [
              {
                text: 'Datos del Tutor',
                style: 'sectionHeader',
                margin: [0, 0, 0, 10]
              },
              {
                table: {
                  widths: ['50%', '50%'],
                  body: [
                    [
                      [
                        { text: 'Nombre Completo', style: 'fieldLabel' },
                        { text: `${this.boletaData.tutor.nombres} ${this.boletaData.tutor.apellidos}`, style: 'fieldValue' }
                      ],
                      [
                        { text: 'Teléfono', style: 'fieldLabel' },
                        { text: this.boletaData.tutor.telefono, style: 'fieldValue' }
                      ]
                    ],
                    [
                      [
                        { text: 'Correo Electrónico', style: 'fieldLabel' },
                        { text: this.boletaData.tutor.correo, style: 'fieldValue' }
                      ],
                      [
                        { text: 'Contacto/parentesco', style: 'fieldLabel' },
                        { text: this.boletaData.tutor.contacto || 'N/A', style: 'fieldValue' }
                      ]
                    ]
                  ]
                },
                layout: {
                  hLineWidth: () => 0,
                  vLineWidth: () => 0,
                  paddingTop: () => 8,
                  paddingBottom: () => 8
                }
              }
            ],
            margin: [0, 0, 0, 20]
          },

          // Niveles Inscritos (condicional)
          ...(this.boletaData?.areas_niveles?.length ? [
            {
              stack: [
                {
                  text: 'Niveles Inscritos',
                  style: 'sectionHeader',
                  margin: [0, 0, 0, 10]
                },
                {
                  table: {
                    widths: ['*', '*'],
                    body: this.generateNivelesTabla()
                  },
                  layout: {
                    hLineWidth: () => 0,
                    vLineWidth: () => 0,
                    paddingTop: () => 8,
                    paddingBottom: () => 8
                  }
                }
              ],
              margin: [0, 0, 0, 20]
            }
          ] : []),

          // Pie de página
          {
            text: [
              'Universidad Nacional de Ciencias • Dirección: Av. Académica #1234 • Teléfono: (591) 123-4567\n',
              'Esta boleta es un documento oficial válido para el proceso de inscripción'
            ],
            style: 'footer',
            margin: [0, 30, 0, 0]
          }
        ],
        styles: {
          headerTitle: {
            fontSize: 22,
            bold: true,
            color: '#1e3a8a'
          },
          headerSubtitle: {
            fontSize: 12,
            italics: true,
            color: '#dc2626'
          },
          boletaLabel: {
            fontSize: 8,
            color: '#1e40af',
            alignment: 'center'
          },
          boletaNumber: {
            fontSize: 16,
            bold: true,
            color: '#1e3a8a',
            alignment: 'center'
          },
          sectionHeader: {
            fontSize: 14,
            bold: true,
            color: '#1e40af',
            margin: [0, 0, 0, 5]
          },
          tableLabel: {
            fontSize: 10,
            color: '#4b5563'
          },
          tableValue: {
            fontSize: 11,
            color: '#111827'
          },
          tableValueGreen: {
            fontSize: 11,
            color: '#15803d',
            bold: true
          },
          montoTotal: {
            fontSize: 20,
            bold: true,
            color: '#1e3a8a',
            alignment: 'center',
            margin: [0, 15, 0, 0]
          },
          fieldLabel: {
            fontSize: 9,
            color: '#6b7280'
          },
          fieldValue: {
            fontSize: 12,
            color: '#111827'
          },
          areaNombre: {
            fontSize: 12,
            bold: true,
            color: '#1e40af'
          },
          nivelItem: {
            fontSize: 11,
            color: '#374151',
            margin: [10, 2, 0, 0]
          },
          footer: {
            fontSize: 8,
            color: '#6b7280',
            alignment: 'center'
          }
        },
        defaultStyle: {
          font: 'Roboto'
        }
      };

      // Generar y descargar el PDF
      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.download(`Boleta_${this.boletaData.numero_boleta}.pdf`);

      this.mensajeEnvio = 'Boleta generada exitosamente';
      this.envioExitoso = true;

    } catch (error) {
      console.error('Error generando PDF:', error);
      this.mensajeEnvio = error instanceof Error ? error.message : 'Error al generar la boleta';
      this.envioExitoso = false;
    }
  }

  private generateNivelesTabla(): any[][] {
    if (!this.boletaData?.areas_niveles?.length) return [];

    // Crear grupos de 2 áreas por fila
    const filas: any[][] = [];
    let currentRow: any[] = [];

    this.boletaData.areas_niveles.forEach((area, index) => {
      const areaCell = {
        stack: [
          { text: area.area_nombre, style: 'areaNombre' },
          ...area.niveles.map(nivel => ({
            text: `• ${nivel.nivel_nombre}`,
            style: 'nivelItem'
          }))
        ],
        margin: [0, 0, 0, 0]
      };

      currentRow.push(areaCell);

      // Si tenemos 2 áreas o es la última área, añadimos la fila
      if (currentRow.length === 2 || index === this.boletaData.areas_niveles.length - 1) {
        // Si es la última área y tenemos una celda en la fila actual, añadimos una celda vacía
        if (currentRow.length === 1 && index === this.boletaData.areas_niveles.length - 1) {
          currentRow.push({});
        }
        filas.push(currentRow);
        currentRow = [];
      }
    });

    return filas;
  }
}
