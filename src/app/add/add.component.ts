import {Component, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {NgForm} from '@angular/forms';
import {Guest, Status} from '../model/guest.model';
import {Location} from '@angular/common';
import {RecordsService} from '../services/records.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  @ViewChild('form')
  form: NgForm;
  success: boolean;
  error: boolean;
  time: { hour: number, minute: number };

  constructor(private data: DataService, private records: RecordsService, private location: Location) {
  }

  onSubmit() {
    const guest: Guest = {
      forename: this.form.value.forename,
      surname: this.form.value.surname,
      phone: this.form.value.phone,
      friends: +this.form.value.friends,
      date: new Date().getTime(),
      status: Status.arrived,
    };
    this.data.addOne(guest).then(() => {
      this.records.addOne(guest).then(() => {
        this.success = true;
        setTimeout(() => {
            this.success = false;
            this.form.onReset();
            this.location.back();
          }, 1000
        );
      }).catch(() => {
        this.error = true;
        setTimeout(() => {
            this.error = false;
          }, 2000
        );
      });
    }).catch(() => {
      this.error = true;
      setTimeout(() => {
          this.error = false;
        }, 2000
      );
    });
  }

  onCancel() {
    this.location.back();
  }
}
