import { Component, OnInit, Input } from '@angular/core';
import { Endereco } from '../model/endereco.model';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'cadastro-cliente-endereco',
  templateUrl: './endereco.component.html'
})
export class EnderecoComponent implements OnInit {

  @Input() endereco: Endereco;

  constructor(private rota: Router) { }

  ngOnInit() {
  }

}
