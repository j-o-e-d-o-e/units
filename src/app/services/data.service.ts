import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Guest, Status} from '../model/guest.model';
import {map} from 'rxjs/operators';

export interface GuestDb extends Guest {
  id: string;
}

@Injectable()
export class DataService {
  private collection: AngularFirestoreCollection<Guest>;
  private doc: AngularFirestoreDocument<Guest>;

  constructor(private db: AngularFirestore) {
  }

  fetchOne(data: string, id: string) {
    this.doc = this.db.doc(data + '/' + id);
    return this.doc.valueChanges();
  }

  fetchMany(data: string, status: string) {
    this.collection = this.db.collection(data, ref => ref.where('status', '==', status));
    return this.collection.snapshotChanges().pipe(map(resp => {
      return resp.map(props => {
        return {
          id: props.payload.doc.id,
          data: props.payload.doc.data()
        };
      }).sort(((a, b) => {
        if (a.data.date > b.data.date) {
          return 1;
        } else if (a.data.date < b.data.date) {
          return -1;
        } else {
          return 0;
        }
      }));
    }));
  }

  addOne(data: string, value: Guest) {
    return this.collection.add(value);
  }

  addMany(data: string, values: Guest[]) {
    for (let value of values) {
      this.collection.add(value)
        .then(() => console.log('done.'))
        .catch(() => console.log('failed.'));
    }
  }

  update(data: string, value: GuestDb) {
    this.collection.doc(value.id).set(value).then();
  }

  removeOne(data: string, id: string) {
    this.db.doc(data + '/' + id).delete().then();
  }

  removeMany(data: string, ids: string[]) {
    for (let id of ids) {
      this.db.doc(data + '/' + id).delete().then();
    }
  }
}
