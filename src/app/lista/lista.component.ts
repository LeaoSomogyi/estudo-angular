import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../model/cliente.model';
import { Tipo } from '../mensagem/tipo.enum';

@Component({
  selector: 'cadastro-cliente-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  clientes: Cliente[] = [];
  mensagem: string = '';
  tipo: Tipo = Tipo.primary;

  constructor(private clienteService: ClienteService) {
    this.clienteService.listar()
    .subscribe(
      (response) => this.clientes = response,
      (erro) => console.log(erro)
    )
   }

  ngOnInit() {
  }

  remover(id){
    this.clienteService.remover(id)
    .subscribe(
      (response) => {
        this.mensagem = response.mensagem;
        this.tipo = Tipo.success;
        this.clientes = this.clientes.filter(c => c.codigo != id);
        this.timeOut();
      }
    )
  }

  timeOut(){
    setTimeout(() => {
      this.mensagem = '';
      this.tipo = Tipo.primary;
    }, 2000);
  }

}
