import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { rotas } from './app.routes';
import { ClienteService } from './services/cliente.service';
import { MensagemComponent } from './mensagem/mensagem.component';
import { ListaComponent } from './lista/lista.component';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NovoEnderecoComponent } from './novo-endereco/novo-endereco.component';
import { SelectModule } from '../../node_modules/ng2-select';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    MenuComponent,
    MensagemComponent,
    ListaComponent,
    CardComponent,
    HeaderComponent,
    EnderecoComponent,
    NovoEnderecoComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    SelectModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    rotas
  ],
  providers: [
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
