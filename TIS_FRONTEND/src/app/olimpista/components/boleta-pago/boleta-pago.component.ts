import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { BoletaPagoResponse } from '../../interfaces/inscripcion.types';

@Component({
  selector: 'app-boleta-pago',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boleta-pago.component.html',
  providers: [DatePipe, CurrencyPipe]
})
export class BoletaPagoComponent {
  @Input() boletaData!: BoletaPagoResponse;

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) {}

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }

  formatCurrency(amount: string): string {
    return this.currencyPipe.transform(amount, 'BOB') || '';
  }
}
