import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Guest, Status} from '../model/guest.model';
import {NgForm} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input()
  private id: string;
  guest: Observable<Guest>;
  @ViewChild('form')
  form: NgForm;
  time: { hour: number, minute: number };
  status: Status;
  success: boolean;
  error: boolean;
  private subscription: Subscription;

  constructor(public activeModal: NgbActiveModal, private router: Router, private data: DataService) {
  }

  ngOnInit(): void {
    this.guest = this.data.fetchOne('guests', this.id);
    this.subscription = this.guest.subscribe(g => {
      const date = new Date(g.date);
      this.time = {hour: date.getHours(), minute: date.getMinutes()};
      this.status = g.status;
    });
  }

  arrived() {
    this.data.updateOne('guests', this.id, {
      status: Status.arrived
    }).then(() => {
      this.success = true;
      setTimeout(() => {
          this.success = false;
          this.activeModal.close('Close click');
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

  remove() {
    this.subscription.unsubscribe();
    this.data.deleteOne('guests', this.id).then(() => {
      this.success = true;
      setTimeout(() => {
          this.success = false;
          this.activeModal.close('Close click');
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

  onSubmit() {
    console.log(this.form);
    this.guest.subscribe(g => console.log(g));
    this.data.updateOne('guests', this.id, {
      forename: this.form.value.forename,
      surname: this.form.value.surname,
      phone: this.form.value.phone,
      friends: +this.form.value.friends,
      date: this.date(),
      status: this.status
    }).then(() => {
      this.success = true;
      setTimeout(() => {
          this.success = false;
          this.activeModal.close('Close click');
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

  private date() {
    const date = new Date(this.form.value.date);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.time.hour, this.time.minute).getTime();
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }
}
