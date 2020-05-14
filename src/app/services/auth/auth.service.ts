import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService {
  private token: string;
  public authenticatedChanged = new Subject<boolean>();
  private admin: boolean;
  public adminChanged = new Subject<boolean>();

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }

  login(mail: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(mail, password)
      .then(() => {
        this.afAuth.auth.currentUser.getIdToken().then((token) => {
          this.token = token;
          this.authenticatedChanged.next(true);
        });
        if (this.afAuth.auth.currentUser.uid === environment.admin) {
          this.admin = true;
          this.adminChanged.next(true);
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  logout() {
    return this.afAuth.auth.signOut()
      .then(() => {
        this.token = null;
        this.authenticatedChanged.next(false);
        this.admin = false;
        this.adminChanged.next(false);
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  isAuthenticated() {
    return this.token != null;
  }

  isAdmin() {
    return this.admin;
  }
}
