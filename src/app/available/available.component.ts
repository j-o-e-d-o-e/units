import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {Status, Guest} from '../model/guest.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalContent} from './modal-content.component';
import {MockData} from '../model/mock.data';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableComponent implements OnInit, OnDestroy {
  guests: Guest[] = [];
  total: number;
  booked: number;
  arrived: number;

  loading: boolean;
  success: boolean;
  error: boolean;
  changed: boolean;
  subscription: Subscription;

  constructor(private data: DataService, private modalService: NgbModal) {
  }

  ngOnInit() {
    // this.loading = true;
    // this.fetch();

    this.guests = MockData.guests;
    this.data.save('units', this.guests);
    this.loading = false;
  }

  private fetch() {
    this.data.fetch('units').subscribe((guests: Guest[][]) => {
      this.guests = guests[0];
      this.total = this.guests.length;
      this.updateStats();
      this.loading = false;
    });
  }

  private updateStats() {
    this.booked = this.guests.filter(unit => unit.status === Status.booked).length;
    this.arrived = this.guests.filter(unit => unit.status === Status.arrived).length;
  }

  // onClick(id: number) {
  //   const clicked = this.units.find(unit => unit.id === id);
  //   const modalRef = this.modalService.open(ModalContent);
  //   modalRef.componentInstance.subject.subscribe(() => {
  //     this.subject = true;
  //     this.updateStats();
  //   });
  //   modalRef.componentInstance.guest = clicked;
  // }

  onSubmit() {
    this.data.update('units', this.guests).then(() => {
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

  onReset() {
    this.fetch();
    this.changed = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
