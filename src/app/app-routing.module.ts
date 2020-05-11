import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/auth/auth-guard.service';
import {CanDeactivateGuard} from './services/deactive-guard.service';
import {ArrivedComponent} from './arrived/arrived.component';
import {AddComponent} from './add/add.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'arrived', component: ArrivedComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path: 'new', component: AddComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
