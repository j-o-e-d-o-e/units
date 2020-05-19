import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Record} from '../model/record.model';
import {RecordsService} from '../services/records.service';
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
  results: Observable<{ id: string, data: Record }[]>;
  opStr = '==';

  constructor(private search: RecordsService) {
  }

  ngOnInit() {
    this.field = 'surname';
    this.date = new Date();
    this.time = {hour: this.date.getHours(), minute: 0};
  }

  onSubmit() {
    if (this.field === 'forename') {
      this.results = this.search.searchByOneField('forename', this.form.value.forename);
    } else if (this.field === 'surname') {
      this.results = this.search.searchByOneField('surname', this.form.value.surname);
    } else if (this.field === 'name') {
      this.results = this.search.searchByName(this.form.value.forename, this.form.value.surname);
    } else if (this.field === 'date') {
      const date = new Date(this.form.value.date);
      if (this.opStr === '==') {
        this.results = this.search.searchByDay(date.setHours(0, 0, 0));
      } else {
        this.results = this.search.searchByDate(date.setHours(this.time.hour, this.time.minute, 0), this.opStr);
      }
    }
  }
}
