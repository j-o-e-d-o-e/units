import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {FooterComponent} from './footer/footer.component';
import {TooltipModule} from 'ng2-tooltip-directive';
import {LoginComponent} from './login/login.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from '../environments/environment';
import {AuthService} from './services/auth/auth.service';
import {SpinnerComponent} from './spinner/spinner.component';
import {AuthGuard} from './services/auth/auth-guard.service';
import {CanDeactivateGuard} from './services/deactive-guard.service';
import {DataService} from './services/data.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ArrivedComponent} from './arrived/arrived.component';
import {AddComponent} from './arrived/add/add.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SpinnerComponent,
    ArrivedComponent,
    AddComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    TooltipModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [AuthService, AuthGuard, CanDeactivateGuard, DataService],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule {
}
