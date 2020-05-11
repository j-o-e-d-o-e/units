import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable()
export class AuthService {
  private token: string;
  public authenticatedChanged = new Subject<boolean>();

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }

  login(mail: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(mail, password)
      .then(() => {
        this.afAuth.auth.currentUser.getIdToken().then((token) => {
          this.token = token;
          this.authenticatedChanged.next(true);
        });
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
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  isAuthenticated() {
    return this.token != null;
  }
}
