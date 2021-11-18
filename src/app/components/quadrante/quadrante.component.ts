import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quadrante',
  templateUrl: './quadrante.component.html',
  styleUrls: ['./quadrante.component.scss']
})
export class QuadranteComponent implements OnInit {

  @Input() quadrante: string = '';
  @Input() numeros: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
