import { RouterModule, Routes } from '@angular/router'
;
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListaComponent } from './lista/lista.component';
import { NovoEnderecoComponent } from './novo-endereco/novo-endereco.component';

const rotasApp: Routes = [
    { path: 'cadastro', component: CadastroComponent},
    { path: 'cadastro/:id', component: CadastroComponent},
    { path: 'cadastro/:id/cliente/:idEnd/endereco', component: CadastroComponent},
    { path: 'endereco', component: NovoEnderecoComponent },
    { path: 'lista', component: ListaComponent}
]

export const rotas = RouterModule.forRoot(rotasApp);