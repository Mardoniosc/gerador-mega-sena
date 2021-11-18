import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bola',
  templateUrl: './bola.component.html',
  styleUrls: ['./bola.component.scss'],
})
export class BolaComponent implements OnInit {
  @Input() numero: number = 0;

  constructor() {}

  ngOnInit() {}
}
