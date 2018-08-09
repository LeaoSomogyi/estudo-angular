import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cliente } from "../model/cliente.model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    private header;
    private url;

    constructor(private http: HttpClient) {
        this.header = {
            app: new HttpHeaders({'Content-type': 'application/json'})
        }

        this.url = 'http://localhost:56885/api/cliente/';
    }

    cadastrar(cliente: Cliente){
        return this.http.post(this.url + 'post', cliente, this.header)
        .pipe(
            map(
                (response) => ({content: response, mensagem: `Cliente ${cliente.nome} cadastrado com sucesso!`})
            )
        )
    }

    atualizar(cliente: Cliente){
        return this.http.put(this.url + 'put', cliente, {observe: 'response'})
        .pipe(
            map(
                (response) => ({content: response, mensagem: `Cliente ${cliente.nome} atualizado com sucesso!`})
            )
        );
    }

    remover(id){
        return this.http.delete(this.url + 'delete/' + id)
        .pipe(
            map(
                (response) => ({content: response, mensagem: `Cliente removido com sucesso!`})
            )
        )
    }

    listar() : Observable<Cliente[]>{
        return this.http.get<Cliente[]>(this.url + 'get');
    }

    buscarPorId(id) : Observable<Cliente> {
        return this.http.get<Cliente>(this.url + 'get/' + id);
    }

}