import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {Status, Guest} from '../model/guest.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalContent} from './modal-content.component';
import {MockData} from '../model/mock.data';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'app-arrived',
  templateUrl: './arrived.component.html',
  styleUrls: ['./arrived.component.css']
})
export class ArrivedComponent implements OnInit {
  guests: Guest[] = [];
  arrivedGuests: Guest[] = [];

  loading: boolean;
  success: boolean;
  error: boolean;
  changed: boolean;
  subscription: Subscription;

  constructor(private data: DataService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loading = true;
    // this.fetch();
    this.mock();
    // this.data.fetch1();
  }

  private mock(){
    this.guests = MockData.guests;
    this.arrivedGuests = this.guests.filter(guest => guest.status === Status.arrived);
    this.data.save('guests', this.guests);
    this.loading = false;
  }

  private fetch() {
    this.data.fetch('guests').subscribe((guests: Guest[][]) => {
      this.guests = guests[0];
      this.arrivedGuests = this.guests.filter(guest => guest.status === Status.arrived).map(guest => {
        guest.date = new Date(guest.date);
        return guest;
      }).sort(((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else if (a.date < b.date) {
          return -1;
        } else {
          return 0;
        }
      }));
      this.loading = false;
    });
  }

  onAdd() {
    this.router.navigate(['/new']).catch();
  }

  onEdit(i: number) {
      const modalRef = this.modalService.open(ModalContent);
      modalRef.componentInstance.guest = this.arrivedGuests[i];
  }

  onClear() {
    if (confirm('Clear all entries in this list?')) {
      this.data.update('guests', this.guests.filter(guest => {
        return guest.status == Status.booked;
      })).then(() => {
        this.success = true;
        setTimeout(() => {
            this.success = false;
          }, 1000
        );
        this.changed = false;
      }).catch(() => {
        this.error = true;
        setTimeout(() => {
            this.error = false;
          }, 1000
        );
      });
    }
  }
}
