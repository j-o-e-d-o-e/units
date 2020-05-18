import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Guest} from '../model/guest.model';
import {map} from 'rxjs/operators';

@Injectable()
export class DataService {
  private path = 'guests';
  private collection: AngularFirestoreCollection<Guest>;
  private doc: AngularFirestoreDocument<Guest>;

  constructor(private db: AngularFirestore) {
  }

  fetchOne(id: string) {
    this.doc = this.db.doc(this.path + '/' + id);
    return this.doc.valueChanges();
  }

  fetchMany(status: string) {
    this.collection = this.db.collection(this.path, ref => {
      return ref.where('status', '==', status).orderBy('date', 'desc');
    });
    return this.collection.snapshotChanges().pipe(map(resp => {
      return resp.map(props => {
        return {
          id: props.payload.doc.id,
          data: props.payload.doc.data()
        };
      });
    }));
  }

  addOne(value: Guest) {
    return this.collection.add(value);
  }

  updateOne(id: string, value: any) {
    return this.db.doc(this.path + '/' + id).update(value);
  }

  deleteOne(id: string) {
    return this.db.doc(this.path + '/' + id).delete();
  }

  // noinspection JSUnusedGlobalSymbols FOR MOCK-DATA
  addMany(values: Guest[]) {
    for (let value of values) {
      this.collection.add(value)
        .then(() => console.log('done.'))
        .catch(() => console.log('failed.'));
    }
  }
}
