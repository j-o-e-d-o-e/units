import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {Status, Guest} from '../model/guest.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalContent} from './modal-content.component';
import {MockData} from '../model/mock.data';
import {Observable, of, pipe} from 'rxjs';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-arrived',
  templateUrl: './arrived.component.html',
  styleUrls: ['./arrived.component.css']
})
export class ArrivedComponent implements OnInit {
  guests: Observable<{ data: Guest; id: string }[]>;
  loading: boolean;
  success: boolean;
  error: boolean;
  changed: boolean;

  constructor(private data: DataService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loading = true;
    this.guests = this.data.fetchMany('guests', Status.arrived);
    // this.data.addMany('guests', MockData.guests);
    this.loading = false;
  }

  onAdd() {
    this.router.navigate(['/new']).catch();
  }

  onEdit(id: string) {
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.id = id;
  }

  onClear() {
    this.guests.pipe(map(value => {
      return value.map(props => {
        return props.id;
      });
    })).subscribe(v => console.log(v));

    const myObservable = of(1, 2, 3);
    myObservable.subscribe({
      next: x => console.log('Observer got a next value: ' + x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    });
    // for (let guest of this.guests.p) {
    //
    // }
    // if (confirm('Clear all entries in list?')) {
    //   }
  }
}
