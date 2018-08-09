import { Component, OnInit, Input } from '@angular/core';
import { Tipo } from './tipo.enum';

@Component({
  selector: 'cadastro-cliente-mensagem',
  templateUrl: './mensagem.component.html'
})
export class MensagemComponent implements OnInit {

  @Input() tipo: Tipo = Tipo.primary;
  @Input() texto: string = '';

  constructor() { }

  ngOnInit() {
  }

}
