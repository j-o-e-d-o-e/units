import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Settings} from '../model/settings.model';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class SettingsService {
  private doc: AngularFirestoreDocument<Settings>;

  constructor(private db: AngularFirestore) {
  }

  fetch() {
    this.doc = this.db.doc('settings/' + environment.settings);
    return this.doc.valueChanges();
  }

  update(value: Settings) {
    return this.doc.update(value);
  }
}
