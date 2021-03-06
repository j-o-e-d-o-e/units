import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Guest, Status} from '../model/guest.model';
import {NgForm} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../services/data.service';
import {RecordsService} from '../services/records.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input()
  private id: string;
  @ViewChild('form')
  form: NgForm;
  guest: Observable<Guest>;
  time: { hour: number, minute: number };
  status: Status;
  success: boolean;
  error: boolean;
  private subscription: Subscription;

  constructor(public activeModal: NgbActiveModal, private data: DataService,
              private records: RecordsService) {
  }

  ngOnInit(): void {
    this.guest = this.data.fetchOne(this.id);
    this.subscription = this.guest.subscribe(g => {
      const date = new Date(g.date);
      this.time = {hour: date.getHours(), minute: date.getMinutes()};
      this.status = g.status;
    });
  }

  arrived() {
    this.data.updateOne(this.id, {
      status: Status.arrived
    }).then(() => {
      this.records.addOne({
        forename: this.form.value.forename,
        surname: this.form.value.surname,
        phone: this.form.value.phone,
        friends: +this.form.value.friends,
        date: this.date()
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
          }, 3000
        );
      });
    }).catch(() => {
      this.error = true;
      setTimeout(() => {
          this.error = false;
        }, 3000
      );
    });
  }

  remove() {
    this.subscription.unsubscribe();
    this.data.deleteOne(this.id).then(() => {
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
        }, 3000
      );
    });
  }

  onSubmit() {
    this.data.updateOne(this.id, {
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
          this.form.onReset();
          this.activeModal.close('Close click');
        }, 1000
      );
    }).catch(() => {
      this.error = true;
      setTimeout(() => {
          this.error = false;
        }, 3000
      );
    });
  }

  private date() {
    const date = new Date(this.form.value.date);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.time.hour, this.time.minute).getTime();
  }


  onCancel() {
    if (this.form.dirty) {
      if (confirm('Unsaved changes. Discard?')) {
        this.activeModal.close('Close click');
      }
    } else {
      this.activeModal.close('Close click');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }
}
