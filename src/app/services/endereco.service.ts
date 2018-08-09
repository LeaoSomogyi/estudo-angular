import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Endereco } from "../model/endereco.model";
import { map } from "../../../node_modules/rxjs/operators";
import { Observable } from "../../../node_modules/rxjs";

@Injectable({
    providedIn: 'root'
})
export class EnderecoService {

    private header;
    private url;

    constructor(private http: HttpClient) {
        this.header = {
            app: new HttpHeaders({'Content-type': 'application/json'})
        }

        this.url = 'http://localhost:56885/api/endereco/';
    }

    cadastrar(endereco:Endereco){
        return this.http.post(this.url + 'post', endereco, this.header)
        .pipe(
            map(
                (response) => ({content: response, mensagem: `Endereço cadastrado com sucesso!`})
            )
        )
    }

    atualizar(endereco:Endereco){
        return this.http.put(this.url + 'put', endereco, this.header)
        .pipe(
            map(
                (response) => ({content: response, mensagem: 'Endereço atualizado com sucesso!'})
            )
        )
    }

    remover(id){
        return this.http.delete(this.url + 'delete/' + id)
        .pipe(
            map(
                (response) => ({content: response, mensagem: 'Endereço removido com sucesso!'})
            )
        )
    }

    buscarPorId(id) : Observable<Endereco>{
        return this.http.get<Endereco>(this.url + 'get' + id);
    }
}