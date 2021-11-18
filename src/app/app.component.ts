import { Component } from '@angular/core';
import { environment as env } from 'src/environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mega-sena';
  jogos: any[] = [];

  detalhes: { titulo: string; descricao: string } = {
    descricao: '',
    titulo: '',
  };

  mostrarDetalhesDezenasNegativa = false;

  public numeroDeJogos: number = 0;

  public dezenasNegativas = env.dezenas_negativas;


  detalhesDezenasNegativas(): void {
    this.mostrarDetalhesDezenasNegativa = !this.mostrarDetalhesDezenasNegativa;
  }
}
