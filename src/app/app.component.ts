import { Component } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import * as toastr from 'toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mega-sena';
  jogos: any[] = [];

  quadrante1 = env.quadrante1;
  quadrante2 = env.quadrante2;
  quadrante3 = env.quadrante3;
  quadrante4 = env.quadrante4;
  dezenasNegativas = env.dezenas_negativas.sort((a, b) => a - b);
  linhas = env.linhas;
  colunas = env.colunas;

  detalhes: { titulo: string; descricao: string } = {
    descricao: '',
    titulo: '',
  };

  mostrarDetalhesDezenasNegativa = false;
  mostrarQuadrantes = false;

  numeroDeJogos: number = 1;
  numeroDeDezenas: number = 6;
  qtdParImpar = '';
  qtdNegativas: number = 0;
  naoAdicionarNegativas: boolean = true;
  numerosSeguidos: boolean = true;
  numerosMesmaColuna: boolean = true;

  checkQuadrante1 = true;
  checkQuadrante2 = true;
  checkQuadrante3 = true;
  checkQuadrante4 = false;

  detalhesDezenasNegativas(): void {
    this.mostrarDetalhesDezenasNegativa = !this.mostrarDetalhesDezenasNegativa;
  }

  detalhesQuadrantes(): void {
    this.mostrarQuadrantes = !this.mostrarQuadrantes;
  }

  gerarJogoAleatorio() {
    if (this.numeroDeJogos <= 0) {
      toastr.error('Numero de jogos deve ser maior que 0', 'Erro', {
        timeOut: 8000,
      });
      return;
    }
    for (let i = 0; i < this.numeroDeJogos; i++) {
      let jogo: number[] = [];
      let numerosRestante = Array.from({ length: 60 }, (_, i) => i + 1);
      while (jogo.length < 6) {
        const sorteado = Math.floor(Math.random() * numerosRestante.length);
        jogo.push(numerosRestante[sorteado]);
        numerosRestante = numerosRestante.filter(
          (n) => n != numerosRestante[sorteado]
        );
        jogo.sort((a, b) => a - b);
      }
      this.jogos.push(jogo);
    }
    toastr.success(this.numeroDeJogos + ' Jogos gerados com sucesso', '', {
      timeOut: 8000,
    });
  }

  gerarJogosComRegras() {
    if (this.numeroDeJogos <= 0) {
      toastr.error('Numero de jogos deve ser maior que 0', 'Erro', {
        timeOut: 8000,
      });
      return;
    }
    var totalDezenas = this.numeroDeDezenas;
    for (let i = 0; i < this.numeroDeJogos; i++) {
      let jogo: number[] = [];
      /* Válida a quantidade de negativas a serem jogodas */
      if (!this.naoAdicionarNegativas) {
        if (this.numeroDeDezenas - this.qtdNegativas < 0) {
          toastr.error(
            'Numero de negativas não pode ser maior que o numero de dezenas a serem jogadas',
            'Erro',
            { timeOut: 8000 }
          );
          return;
        }
      }

      /* Adiciona as negativas ao jogo atual */
      if (this.qtdNegativas > 0) {
        let numerosRestanteNegativas = this.dezenasNegativas;
        while (jogo.length < this.qtdNegativas) {
          const sorteado = Math.floor(
            Math.random() * numerosRestanteNegativas.length
          );
          jogo.push(numerosRestanteNegativas[sorteado]);
          numerosRestanteNegativas = numerosRestanteNegativas.filter(
            (n) => n != numerosRestanteNegativas[sorteado]
          );
        }
      }

      let numerosRestante: number[] = [];
      if (this.checkQuadrante1) {
        numerosRestante = [];
        this.quadrante1.completo.forEach((element) => {
          numerosRestante.push(element);
        });
      }

      if (this.checkQuadrante2) {
        this.quadrante2.completo.forEach((element) => {
          numerosRestante.push(element);
        });
      }

      if (this.checkQuadrante3) {
        this.quadrante3.completo.forEach((element) => {
          numerosRestante.push(element);
        });
      }

      if (this.checkQuadrante4) {
        this.quadrante4.completo.forEach((element) => {
          numerosRestante.push(element);
        });
      }

      if (numerosRestante.length <= 0) {
        toastr.error(
          'Não foi possivel gerar o jogo pois não tem numeros suficientes para completar o jogo com as regras selecionadas',
          'Erro',
          { timeOut: 8000 }
        );
        return;
      }

      /* remover negativas */
      this.dezenasNegativas.forEach((d) => {
        numerosRestante = numerosRestante.filter((n) => n != d);
      });

      while (jogo.length < this.numeroDeDezenas) {
        if(numerosRestante.length <= 0) {
          toastr.error(
            'Não foi possivel gerar o jogo pois não tem numeros suficientes para completar o jogo com as regras selecionadas',
            'Erro',
            { timeOut: 8000 }
          );
          return;
        }
        const sorteado = Math.floor(Math.random() * numerosRestante.length);

        const sequencial = jogo.find(x => ((x + 1) == numerosRestante[sorteado] || ((x -1) == numerosRestante[sorteado])));


        /* Removendo numero que seria sequencial */
        if(sequencial == undefined) {
          jogo.push(numerosRestante[sorteado]);
        }

        numerosRestante = numerosRestante.filter(
          (n) => n != numerosRestante[sorteado]
        );
      }
      jogo.sort((a, b) => a - b);
      this.jogos.push(jogo);
    }

    toastr.success(this.numeroDeJogos + ' Jogos gerados com sucesso', '', {
      timeOut: 8000,
    });
  }

  limparJogos() {
    this.jogos = [];
    toastr.options.progressBar = true;
    toastr.info('Zerado os jogos salvos', '', { timeOut: 8000 });
  }
}
