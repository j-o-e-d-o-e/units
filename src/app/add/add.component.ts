import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {NgForm} from '@angular/forms';
import {Guest, Status} from '../model/guest.model';
import {Record} from '../model/record.model';
import {Location} from '@angular/common';
import {RecordsService} from '../services/records.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @ViewChild('form')
  form: NgForm;
  success: boolean;
  error: boolean;
  date: Date;
  time: { hour: number, minute: number };
  status: Status;

  constructor(private data: DataService, private route: ActivatedRoute, private records: RecordsService, private location: Location) {
  }

  ngOnInit(): void {
    this.status = this.route.snapshot.params.status == Status.arrived ? Status.arrived : Status.booked;
    if (this.status === Status.booked) {
      this.date = new Date();
      this.time = {hour: this.date.getHours(), minute: this.date.getMinutes()};
    }
  }

  onSubmit() {
    const guest: Guest = {
      forename: this.form.value.forename,
      surname: this.form.value.surname,
      phone: this.form.value.phone,
      friends: +this.form.value.friends,
      date: this.status === Status.arrived ? new Date().getTime() : this.getDate(),
      status: this.status,
    };
    this.data.addOne(guest).then(() => {
      if (this.status === Status.arrived) {
        const record: Record = {
          forename: guest.forename,
          surname: guest.surname,
          phone: guest.phone,
          friends: guest.friends,
          date: guest.date,
        };
        this.records.addOne(record).then(() => {
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
      } else {
        this.success = true;
        setTimeout(() => {
            this.success = false;
            this.form.onReset();
            this.location.back();
          }, 1000
        );
      }
    }).catch(() => {
      this.error = true;
      setTimeout(() => {
          this.error = false;
        }, 2000
      );
    });
  }

  private getDate() {
    const date = new Date(this.form.value.date);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.time.hour, this.time.minute).getTime();
  }

  onCancel() {
    this.location.back();
  }
}
