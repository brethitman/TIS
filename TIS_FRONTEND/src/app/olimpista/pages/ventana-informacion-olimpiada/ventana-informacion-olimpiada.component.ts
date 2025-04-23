import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ventana-informacion-olimpiada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventana-informacion-olimpiada.component.html',
  //styleUrls: ['./ventana-informacion-olimpiada.component.css']
})
export class VentanaInformacionOlimpiadaComponent implements OnInit {
  olimpiadaId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el ID de la olimpiada de la URL
    this.route.params.subscribe(params => {
      this.olimpiadaId = params['id'];
      console.log('ID Olimpiada:', this.olimpiadaId);
      
      // Aquí iría la lógica para cargar los datos de la olimpiada
      // usando this.olimpiadaId
    });
  }
}