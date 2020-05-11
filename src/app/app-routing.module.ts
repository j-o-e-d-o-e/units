import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/auth/auth-guard.service';
import {CanDeactivateGuard} from './services/deactive-guard.service';
import {AvailableComponent} from './available/available.component';

const routes: Routes = [
  {path: 'available', component: AvailableComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path: '', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
