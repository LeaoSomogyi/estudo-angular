import { Component, OnInit, ViewChild } from '@angular/core';
import { Endereco } from '../model/endereco.model';
import { Tipo } from '../mensagem/tipo.enum';
import { SelectComponent } from 'ng2-select';
import { ClienteService } from '../services/cliente.service';
import { EnderecoService } from '../services/endereco.service';
import { Cliente } from '../model/cliente.model';

@Component({
  selector: 'cadastro-cliente-novo-endereco',
  templateUrl: './novo-endereco.component.html'
})
export class NovoEnderecoComponent implements OnInit {

  @ViewChild('selectCliente') selectCliente: SelectComponent;

  endereco: Endereco;
  cliente: Cliente;
  mensagem: string;
  tipo: Tipo;
  titulo: string;

  constructor(private clienteService: ClienteService, private enderecoService: EnderecoService) { }

  ngOnInit() {
    this.endereco = new Endereco();
    this.cliente = new Cliente();
    this.mensagem = '';
    this.selectCliente.items = [];
    this.tipo = Tipo.secondary;
    this.titulo = 'Cadastrar Endereço por Cliente';
  }

  getCliente(letras: any) {
    this.clienteService.listar()
      .subscribe(
        (response) => {
          this.selectCliente.items = response.map(result => {
            return { id: result.codigo, text: result.nome }
          })
        }
      )
  }

  setCliente(valor: any) {
    this.cliente.codigo = valor.id;
    this.cliente.nome = valor.text;
  }

  cadastrar() {
    this.endereco.cliente_codigo = this.cliente.codigo;

    this.enderecoService.cadastrar(this.endereco)
      .subscribe(
        (response) => {
          this.mensagem = response.mensagem;
          this.tipo = Tipo.success;
          this.timeout();
        },
        (error) => {
          console.log(error);
          this.mensagem = 'Problemas ao cadastrar endereço';
          this.tipo = Tipo.danger;
          this.timeout();
        }
      )
  }

  timeout() {
    setTimeout(() => {
      this.selectCliente.items = [];
      this.endereco = new Endereco();
      this.cliente = new Cliente();
      this.mensagem = '';
      this.tipo = Tipo.primary;
    }, 2000);
  }

}
