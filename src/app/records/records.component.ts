import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Guest} from '../model/guest.model';
import {SearchService} from '../services/search.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  @ViewChild('form')
  form: NgForm;
  field: string;
  date: Date;
  time: { hour: number, minute: number };
  results: Observable<{ id: string, data: Guest }[]>;
  rel: string;

  constructor(private search: SearchService) {
  }

  ngOnInit() {
    this.field = 'surname';
    this.date = new Date();
    this.time = {hour: this.date.getHours(), minute: 0};
    this.rel = 'less than';
  }

  onSubmit() {
    if (this.field === 'forename') {
      // this.results = this.search.searchByOneField('guests', 'forename', this.form.value.forename);
    } else if (this.field === 'surname') {
      this.results = this.search.searchByOneField('guests', 'surname', this.form.value.surname);
    } else if (this.field === 'name') {
      console.log('name: ', this.form.value.forename, this.form.value.surname);
      // this.results = this.search.searchByName('guests', this.form.value.forename, this.form.value.surname);
    } else if (this.field === 'date') {
      let opStr: any;
      if (this.rel === 'less than') {
        opStr = '<=';
      }else{
        opStr = '>=';
      }
      console.log('date: ', this.getDate(), opStr);
      // this.results = this.search.searchByDate('guests', this.getDate(), opStr);
    }
  }

  private getDate() {
    const date = new Date(this.form.value.date);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.time.hour, this.time.minute).getTime();
  }
}
