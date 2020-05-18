import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Guest, Status} from '../model/guest.model';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../modal/modal.component';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css']
})
export class BookedComponent implements OnInit {
  guests: Observable<{ data: Guest; id: string }[]>;
  success: boolean;
  error: boolean;

  constructor(private data: DataService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.guests = this.data.fetchMany(Status.booked);
  }

  onAdd() {
    this.router.navigate(['/booked-new']).catch();
  }

  onEdit(id: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.id = id;
  }

  onClear() {
    if (confirm('Clear all entries in list?')) {
      this.data.fetchMany(Status.booked).pipe(map(data => {
        return data.map(props => {
          return props.id;
        });
      })).subscribe(ids => {
        ids.forEach((id: string, index: number, array: string[]) => {
          this.data.deleteOne(id).then();
          if (index === array.length - 1 && this.guests.subscribe(res => res.length === 0)) {
            this.success = true;
            setTimeout(() => {
                this.success = false;
              }, 1000
            );
          } else {
            this.error = true;
            setTimeout(() => {
                this.error = false;
              }, 2000
            );
          }
        });
      });
    }
  }

  onArrived() {
    if (confirm('Move all entries to arrived?')) {
      this.data.fetchMany(Status.booked).pipe(map(data => {
        return data.map(props => {
          return props.id;
        });
      })).subscribe(ids => {
        ids.forEach((id: string, index: number, array: string[]) => {
          this.data.updateOne(id, {status: Status.arrived}).then();
          if (index === array.length - 1 && this.guests.subscribe(res => res.length === 0)) {
            this.success = true;
            setTimeout(() => {
                this.success = false;
                this.router.navigate(['/arrived']).catch();
              }, 1000
            );
          } else {
            this.error = true;
            setTimeout(() => {
                this.error = false;
              }, 2000
            );
          }
        });
      });
    }
  }
}
