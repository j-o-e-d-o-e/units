import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Guest} from '../model/guest.model';
import {map} from 'rxjs/operators';

@Injectable()
export class SearchService {
  private collection: AngularFirestoreCollection<Guest>;

  constructor(private db: AngularFirestore) {
  }

  searchByOneField(data: string, field: string, value: string) {
    this.collection = this.db.collection(data, ref => {
      return ref.where(field, '==', value)
        .orderBy('date', 'desc');
    });
    return this.data();
  }

  searchByName(data: string, forename: string, surname: string) {
    this.collection = this.db.collection(data, ref => {
      return ref.where('forename', '==', forename)
        .where('surname', '==', surname)
        .orderBy('date', 'desc');
    });
    return this.data();
  }

  searchByDate(data: string, date: number, rel: any) {
    this.collection = this.db.collection(data, ref => {
      return ref.where('date', rel, date)
        .orderBy('date', 'desc');
    });
    return this.data();
  }

  private data() {
    return this.collection.snapshotChanges().pipe(map(resp => {
      return resp.map(props => {
        return {
          id: props.payload.doc.id,
          data: props.payload.doc.data()
        };
      });
    }));
  }
}
