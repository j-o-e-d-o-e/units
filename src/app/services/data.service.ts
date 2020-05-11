import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Guest} from '../model/guest.model';
import {map} from 'rxjs/operators';

@Injectable()
export class DataService {
  private key: string;
  public val: any;

  constructor(private db: AngularFireDatabase) {
  }

  fetch(data: string) {
    return this.db.list(data).snapshotChanges().pipe(
      map((resp: any[]) => resp.map(resp => {
        this.key = resp.key;
        return resp.payload.val();
      }))
    );
  }

  update(data: string, value: Guest[]) {
    return this.db.list(data).set(this.key, value);
  }

  save(data: string, value: Guest[]) {
    return this.db.list(data).push(value);
  }
}
