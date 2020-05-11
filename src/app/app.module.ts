import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FooterComponent} from './footer/footer.component';
import {TooltipModule} from 'ng2-tooltip-directive';
import {LoginComponent} from './login/login.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import {AuthService} from './services/auth/auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {SpinnerComponent} from './spinner/spinner.component';
import {AuthGuard} from './services/auth/auth-guard.service';
import {CanDeactivateGuard} from './services/deactive-guard.service';
import {DataService} from './services/data.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalContent} from './arrived/modal-content.component';
import {ArrivedComponent} from './arrived/arrived.component';
import {AddComponent} from './add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SpinnerComponent,
    ModalContent,
    ArrivedComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    TooltipModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [AuthService, AuthGuard, CanDeactivateGuard, DataService],
  bootstrap: [AppComponent],
  entryComponents: [ModalContent]
})
export class AppModule {
}
