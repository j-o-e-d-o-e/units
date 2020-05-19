import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Record} from '../model/record.model';
import {map} from 'rxjs/operators';

@Injectable()
export class RecordsService {
  private path = 'records';
  private collection: AngularFirestoreCollection<Record>;

  constructor(private db: AngularFirestore) {
  }

  addOne(value: Record) {
    return this.db.collection(this.path).add(value);
  }

  searchByOneField(field: string, value: string) {
    this.collection = this.db.collection(this.path, ref => {
      return ref.where(field, '==', value)
        .orderBy('date', 'desc');
    });
    return this.data();
  }

  searchByName(forename: string, surname: string) {
    this.collection = this.db.collection(this.path, ref => {
      return ref.where('forename', '==', forename)
        .where('surname', '==', surname)
        .orderBy('date', 'desc');
    });
    return this.data();
  }

  searchByDate(date: number, rel: any) {
    this.collection = this.db.collection(this.path, ref => {
      return ref.where('date', rel, date)
        .orderBy('date', 'desc');
    });
    return this.data();
  }

  searchByDay(date: number) {
    this.collection = this.db.collection(this.path, ref => {
      return ref.where('date', '>=', date)
        .where('date', '<=', date + 24 * 60 * 60 * 1000)
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
