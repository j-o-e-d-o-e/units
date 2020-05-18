import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/auth/auth-guard.service';
import {CanDeactivateGuard} from './services/deactive-guard.service';
import {ArrivedComponent} from './arrived/arrived.component';
import {BookedComponent} from './booked/booked.component';
import {AddComponent} from './add/add.component';
import {AddBookedComponent} from './add-booked/add-booked.component';
import {RecordsComponent} from './records/records.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'arrived', component: ArrivedComponent, canActivate: [AuthGuard]},
  {path: 'arrived-new', component: AddComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path: 'booked', component: BookedComponent, canActivate: [AuthGuard]},
  {path: 'booked-new', component: AddBookedComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path: 'records', component: RecordsComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path: 'logout', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
