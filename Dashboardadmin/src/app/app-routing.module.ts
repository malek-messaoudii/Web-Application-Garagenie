import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions} from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { PassComponent } from './pass/pass.component';
import { UsersignupComponent } from './usersignup/usersignup.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AproposComponent } from './apropos/apropos.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DevisComponent } from './devis/devis.component';
import { AdminComponent } from './admin/admin.component';
import { ModifadminComponent } from './modifadmin/modifadmin.component';
import { ClientparticulierComponent } from './clientparticulier/clientparticulier.component';
import { MessagesadminComponent } from './messagesadmin/messagesadmin.component';
import { UtilisateursadminComponent } from './utilisateursadmin/utilisateursadmin.component';
import { AjoutadminComponent } from './ajoutadmin/ajoutadmin.component';
import { PromotionsadminComponent } from './promotionsadmin/promotionsadmin.component';
import { DevisadminComponent } from './devisadmin/devisadmin.component';
import { RdvComponent } from './rdv/rdv.component';
import { RdvpComponent } from './rdvp/rdvp.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64], // facultatif, ajustez selon vos besoins
};
const routes: Routes = [
  {path : '', component : AdminComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminComponent },
  { path: 'utilisateurs', component: UtilisateursadminComponent },
  { path: 'messages', component: MessagesadminComponent },
  { path: 'promotions', component: PromotionsadminComponent },
  {path : 'clientpart', component : ClientparticulierComponent},
  { path: 'devis' , component : DevisadminComponent},
  { path: 'modifier' , component : ModifadminComponent},
  { path: 'ajoutadmin', component: AjoutadminComponent },
  { path: 'rdv', component: RdvComponent },
  { path: 'rdvp', component: RdvpComponent },
  { path: '**' , component : NotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
