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
  qtdPar = 0;
  qtdImpar = 0;
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

  definiTotalImparPar() {
    switch (this.qtdParImpar) {
      case '3 pares e 3 ímpares':
        this.qtdPar = 3;
        this.qtdImpar = 3;
        break;
      case '4 pares e 2 ímpares':
        this.qtdPar = 4;
        this.qtdImpar = 2;
        break;
      case '2 pares e 4 ímpares':
        this.qtdPar = 2;
        this.qtdImpar = 4;
        break;
      case 'Mesma quantidade Par e Impar':
        if ((this.numeroDeDezenas - this.qtdNegativas) / 2 == 0) {
          this.qtdPar = (this.numeroDeDezenas - this.qtdNegativas) / 2;
          this.qtdImpar = (this.numeroDeDezenas - this.qtdNegativas) / 2;
        } else {
          this.qtdPar = (this.numeroDeDezenas - 1 - this.qtdNegativas) / 2;
          this.qtdImpar = (this.numeroDeDezenas - 1 - this.qtdNegativas) / 2;
          this.qtdPar++;
        }
        break;
      default:
        break;
    }
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
      while (jogo.length < this.numeroDeDezenas) {
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
    this.definiTotalImparPar();
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
          if (numerosRestanteNegativas[sorteado] / 2 == 0) {
            this.qtdPar--;
          } else {
            this.qtdImpar--;
          }
          jogo.push(numerosRestanteNegativas[sorteado]);
          numerosRestanteNegativas = numerosRestanteNegativas.filter(
            (n) => n != numerosRestanteNegativas[sorteado]
          );
        }
      }

      let numerosRestante: number[] = [];
      let numerosRestantePares: number[] = [];
      let numerosRestanteImpares: number[] = [];

      if (this.qtdParImpar == '') {
        this.qtdParImpar = 'Aleatório';
      }
      if (this.qtdParImpar == 'Aleatório') {
        if (this.checkQuadrante1) {
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
      } else {
        if (this.checkQuadrante1) {
          this.quadrante1.pares.forEach((element) => {
            numerosRestantePares.push(element);
          });
          this.quadrante1.impares.forEach((element) => {
            numerosRestanteImpares.push(element);
          });
        }

        if (this.checkQuadrante2) {
          this.quadrante2.pares.forEach((element) => {
            numerosRestantePares.push(element);
          });
          this.quadrante2.impares.forEach((element) => {
            numerosRestanteImpares.push(element);
          });
        }

        if (this.checkQuadrante3) {
          this.quadrante3.pares.forEach((element) => {
            numerosRestantePares.push(element);
          });
          this.quadrante3.impares.forEach((element) => {
            numerosRestanteImpares.push(element);
          });
        }

        if (this.checkQuadrante4) {
          this.quadrante4.pares.forEach((element) => {
            numerosRestantePares.push(element);
          });
          this.quadrante4.impares.forEach((element) => {
            numerosRestanteImpares.push(element);
          });
        }
      }

      if (numerosRestante.length <= 0 && this.qtdParImpar == 'Aleatório') {
        toastr.error(
          'Não foi possivel gerar o jogo pois não tem numeros suficientes para completar o jogo com as regras selecionadas',
          'Erro xF1001',
          { timeOut: 8000 }
        );
        return;
      }

      /* remover negativas */
      if (this.qtdParImpar == 'Aleatório') {
        this.dezenasNegativas.forEach((d) => {
          numerosRestante = numerosRestante.filter((n) => n != d);
        });
      } else {
        this.dezenasNegativas.forEach((d) => {
          numerosRestantePares = numerosRestantePares.filter((n) => n != d);
        });

        this.dezenasNegativas.forEach((d) => {
          numerosRestanteImpares = numerosRestanteImpares.filter((n) => n != d);
        });
      }

      if (this.qtdParImpar == 'Aleatório') {
        while (jogo.length < this.numeroDeDezenas) {
          if (numerosRestante.length <= 0) {
            toastr.error(
              'Não foi possivel gerar o jogo pois não tem numeros suficientes para completar o jogo com as regras selecionadas',
              'Erro xF1002',
              { timeOut: 8000 }
            );
            return;
          }
          const sorteado = Math.floor(Math.random() * numerosRestante.length);
          let mesmaColuna = false;
          let numeroSequencial = false;

          /* Faz a validação se o numero é sequencial */
          if (this.numerosSeguidos) {
            const sequencial = jogo.find(
              (x) =>
                x + 1 == numerosRestante[sorteado] ||
                x - 1 == numerosRestante[sorteado]
            );

            if (sequencial != undefined) {
              numeroSequencial = true;
            }
          }

          /* Faz a validação de numero na vertical */
          if (this.numerosMesmaColuna) {
            Object.entries(this.colunas).forEach((coluna) => {
              const colunaDoNumeroSorteado = coluna[1].find(
                (x) => x == numerosRestante[sorteado]
              );
              if (colunaDoNumeroSorteado) {
                const interseccao = coluna[1].filter((x) => jogo.includes(x));
                if (interseccao.length > 0) {
                  mesmaColuna = true;
                }
              }
            });
          }

          /* Removendo numero que seria sequencial é/ou vertical */
          if (!numeroSequencial && !mesmaColuna) {
            jogo.push(numerosRestante[sorteado]);
          }

          numerosRestante = numerosRestante.filter(
            (n) => n != numerosRestante[sorteado]
          );
        }
      } else {
        /* Adiciona numeros pares */
        for (let p = 0; p < this.qtdPar; ) {
          if (numerosRestantePares.length <= 0) {
            toastr.error(
              'Não foi possivel gerar o jogo pois não tem numeros suficientes para completar o jogo com as regras selecionadas',
              'Erro xF1003',
              { timeOut: 8000 }
            );
            return;
          }

          const sorteado = Math.floor(Math.random() * numerosRestantePares.length);
          let mesmaColuna = false;
          let numeroSequencial = false;

          /* Faz a validação se o numero é sequencial */
          if (this.numerosSeguidos) {
            const sequencial = jogo.find(
              (x) =>
                x + 1 == numerosRestantePares[sorteado] ||
                x - 1 == numerosRestantePares[sorteado]
            );

            if (sequencial != undefined) {
              numeroSequencial = true;
            }
          }

          /* Faz a validação de numero na vertical */
          if (this.numerosMesmaColuna) {
            Object.entries(this.colunas).forEach((coluna) => {
              const colunaDoNumeroSorteado = coluna[1].find(
                (x) => x == numerosRestantePares[sorteado]
              );
              if (colunaDoNumeroSorteado) {
                const interseccao = coluna[1].filter((x) => jogo.includes(x));
                if (interseccao.length > 0) {
                  mesmaColuna = true;
                }
              }
            });
          }

          /* Removendo numero que seria sequencial é ou vertical */
          if (!numeroSequencial && !mesmaColuna) {
            jogo.push(numerosRestantePares[sorteado]);
            p++;
          }

          numerosRestantePares = numerosRestantePares.filter(
            (n) => n != numerosRestantePares[sorteado]
          );
        }

        /* Adiciona numeros impares */
        for (let p = 0; p < this.qtdImpar; ) {
          if (numerosRestanteImpares.length <= 0) {
            toastr.error(
              'Não foi possivel gerar o jogo pois não tem numeros suficientes para completar o jogo com as regras selecionadas',
              'Erro xF1004',
              { timeOut: 8000 }
            );
            return;
          }

          const sorteado = Math.floor(Math.random() * numerosRestanteImpares.length);
          let mesmaColuna = false;
          let numeroSequencial = false;

          /* Faz a validação se o numero é sequencial */
          if (this.numerosSeguidos) {
            const sequencial = jogo.find(
              (x) =>
                x + 1 == numerosRestanteImpares[sorteado] ||
                x - 1 == numerosRestanteImpares[sorteado]
            );

            if (sequencial != undefined) {
              numeroSequencial = true;
            }
          }

          /* Faz a validação de numero na vertical */
          if (this.numerosMesmaColuna) {
            Object.entries(this.colunas).forEach((coluna) => {
              const colunaDoNumeroSorteado = coluna[1].find(
                (x) => x == numerosRestanteImpares[sorteado]
              );
              if (colunaDoNumeroSorteado) {
                const interseccao = coluna[1].filter((x) => jogo.includes(x));
                if (interseccao.length > 0) {
                  mesmaColuna = true;
                }
              }
            });
          }

          /* Removendo numero que seria sequencial é ou vertical */
          if (!numeroSequencial && !mesmaColuna) {
            jogo.push(numerosRestanteImpares[sorteado]);
            p++;
          }

          numerosRestanteImpares = numerosRestanteImpares.filter(
            (n) => n != numerosRestanteImpares[sorteado]
          );
        }
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
