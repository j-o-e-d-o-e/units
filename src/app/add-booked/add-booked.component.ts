import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DataService} from '../services/data.service';
import {Location} from '@angular/common';
import {Guest, Status} from '../model/guest.model';

@Component({
  selector: 'app-add-booked',
  templateUrl: './add-booked.component.html',
  styleUrls: ['./add-booked.component.css']
})
export class AddBookedComponent implements OnInit{
  @ViewChild('form')
  form: NgForm;
  success: boolean;
  error: boolean;
  date: Date;
  time: { hour: number, minute: number };

  constructor(private data: DataService, private location: Location) {
  }

  ngOnInit(): void {
    this.date = new Date();
    this.time = {hour: this.date.getHours(), minute: this.date.getMinutes()}
  }

  onSubmit() {
    const guest: Guest = {
      forename: this.form.value.forename,
      surname: this.form.value.surname,
      phone: this.form.value.phone,
      friends: +this.form.value.friends,
      date: this.getDate(),
      status: Status.booked,
    };
    this.data.addOne(guest).then(() => {
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
        }, 1000
      );
    });
  }

  onCancel() {
    this.location.back();
  }

  private getDate() {
    console.log(this.form.value.date);
    const date = new Date(this.form.value.date);
    console.log(date);
    console.log(this.date);
    console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.time.hour, this.time.minute).getTime());
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.time.hour, this.time.minute).getTime();
  }
}

