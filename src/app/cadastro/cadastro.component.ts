import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../model/cliente.model';
import { Endereco } from '../model/endereco.model';
import { ClienteService } from '../services/cliente.service';
import { Tipo } from '../mensagem/tipo.enum';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { EnderecoService } from '../services/endereco.service';

@Component({
  selector: 'cadastro-cliente-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  cliente: Cliente = new Cliente();
  endereco: Endereco = new Endereco();
  enderecos: Endereco[] = [];
  mensagem: string = '';
  tipo: Tipo = Tipo.primary;
  botao: string;
  botaoEndereco: string;
  icon: string;
  isEdicao = false;
  isEdicaoEndereco = false;
  titulo: string = '';
  idCliente;
  idEndereco;

  constructor(private clienteService: ClienteService, private enderecoService: EnderecoService,
    private rota: ActivatedRoute, private rotas: Router) {

      this.rota.params.subscribe(
        params => {
          this.idCliente = params['id'];
          this.idEndereco = params['idEnd'];

          if(this.idCliente != undefined){
            this.clienteService.buscarPorId(this.idCliente)
            .subscribe(
              (retorno) => {
                  this.cliente = retorno;
                  this.botao = 'Editar';
                  this.titulo = 'Detalhes';
                  this.enderecos = retorno.lista_endereco;
    
                  if(this.idEndereco != undefined){
                    this.endereco = this.enderecos.filter(e => e.codigo == this.idEndereco)[0];
                    this.botaoEndereco = 'Atualizar Endereço';
                    this.icon = 'pencil';
                    this.isEdicaoEndereco = true;
                  }
                  else{
                    this.botaoEndereco = 'Adicionar Endereço'
                    this.icon = 'plus';
                  }
    
                  this.isEdicao = true;
              }
            )
          }
          else {
            this.titulo ='Cadastrar';
            this.botao = 'Cadastrar';
          }
        }
      );
   }

  ngOnInit() {
  }

  cadastrar(){
    this.cliente.lista_endereco.push(this.endereco); 

    this.clienteService.cadastrar(this.cliente)
    .subscribe(
      (response) => {
        console.log(response);
        this.mensagem = response.mensagem;
        this.tipo = Tipo.success;
        this.timeOut();
      },
      (error) => {
        console.log(error);
        this.mensagem = 'Problemas ao cadastrar o cliente';
        this.tipo = Tipo.danger;
        this.timeOut();
      }
    );
  }

  adicionarEndereco(){
    if(!this.isEdicaoEndereco){
      this.endereco.cliente_codigo = this.cliente.codigo;

      this.enderecoService.cadastrar(this.endereco)
      .subscribe(
        (response) => {
          console.log(response);
          this.mensagem = response.mensagem;
          this.tipo = Tipo.success;
          this.enderecos.push(this.endereco);
          this.timeOutEndereco();
        },
        (error) => {
          console.log(error);
          this.mensagem = 'Problemas ao cadastrar o endereço';
          this.tipo = Tipo.danger;
          this.timeOutEndereco();
        }
      )
    }
    else{
      this.enderecoService.atualizar(this.endereco)
      .subscribe(
        (response) => {
          console.log(response);
          this.mensagem = response.mensagem;
          this.tipo = Tipo.success;
          this.timeOutEndereco();
        },
        (error) => {
          console.log(error);
          this.mensagem = 'Problemas ao atualizar o endereço';
          this.tipo = Tipo.danger;
          this.timeOutEndereco();
        }
      )
    }
  }

  removerEndereco(id){
    this.enderecoService.remover(id)
    .subscribe(
      (response) => {
        console.log(response);
        this.enderecos = this.enderecos.filter(e => e.codigo != id);
        this.mensagem = response.mensagem;
        this.tipo = Tipo.success;
        this.timeOutEndereco();
      },
      (error) => {
        console.log(error);
        this.mensagem = 'Problemas ao remover endereço';
        this.tipo = Tipo.danger;
        this.timeOutEndereco();
      }
    )
  }

  timeOut(){
    setTimeout(() => {
      this.cliente = new Cliente();
      this.endereco = new Endereco();
      this.enderecos = [];
      this.mensagem = '';
      this.tipo = Tipo.primary;
    }, 2000);
  }

  timeOutEndereco(){
    setTimeout(() => {
      this.endereco = new Endereco();
      this.mensagem = '';
      this.tipo = Tipo.primary;
    }, 2000);
  }

}
