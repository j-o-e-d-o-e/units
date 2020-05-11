import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Guest} from '../model/guest.model';
import {map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class DataService implements OnInit {
  private key: string;
  public val: any;
  private guests: AngularFireList<unknown>;
  private guests1: Observable<unknown[]>;
  private resp: Observable<any>;
  private resp1: any;

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    // this.guests1 = this.db.list('guests').valueChanges();
    // this.guests = this.db.list('guests');
  }

  fetch(data: string) {
    return this.db.list(data).snapshotChanges().pipe(
      map((resp: any[]) => resp.map(resp => {
        this.key = resp.key;
        return resp.payload.val();
      }))
    );
  }

  fetch1() {
    return this.db.list('guests').snapshotChanges().pipe(
      map((resp: any[]) => resp.map(resp => {
        this.resp1 = resp;
        this.key = resp.key;
        this.resp = resp.payload.val();
        this.resp.subscribe()
      }))
    );
  }

  update(data: string, values: Guest[]) {
    return this.db.list(data).set(this.key, values.map(value => {
      return DataService.dateToString(value);
    }));
  }

  save(data: string, values: Guest[]) {
    return this.db.list(data).push(values.map(value => {
      return DataService.dateToString(value);
    }));
  }

  push(data: string, value: Guest) {
    // return this.http.post(environment.firebase.databaseURL + 'guests', value);

    return this.db.list(data).push(value);
    // return this.guests.push({ content: value, done: false });
  }

  private static dateToString(value: Guest) {
    return {
      forename: value.forename,
      surname: value.surname,
      phone: value.phone,
      friends: value.friends,
      date: value.date.toLocaleString('de-DE'),
      status: value.status
    };
  }
}
