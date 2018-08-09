import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../model/cliente.model';

@Component({
  selector: 'cadastro-cliente-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  @Input() cliente: Cliente;

  constructor() { }

  ngOnInit() {
  }

}
