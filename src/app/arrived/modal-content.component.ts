import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Status, Guest} from '../model/guest.model';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">
        {{(guest | async)?.forename + (guest | async)?.surname}}
        <span class="h6">{{(guest | async)?.status}}</span>
      </h4>
    </div>
    <div class="modal-body">
      <p>Date: {{(guest | async)?.date | date: 'H:mm, dd.MM.yy'}}</p>
      <p>Phone: {{(guest| async)?.phone}}</p>
      <p>Friends: {{(guest | async)?.friends}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-free" *ngIf="(guest | async)?.status !== 'arrived'" (click)="arrived()">Arrived</button>
      <button type="button" class="btn btn-danger" *ngIf="(guest | async)?.status !== 'reserved'" (click)="remove()">Remove</button>
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Cancel</button>
    </div>
  `,
  styles: ['.btn-arrived, .btn-left, .btn-use {margin-right: 10px}',
    '.btn-arrived{background-color: #2298F2; color: white}',
    '.btn-left{background-color: #FFC44B; color: white}',
    '.btn-use{background-color: #82FF35; color: white}',
  ]
})
export class ModalContent implements OnInit{
  @Input()
  private id: string;
  guest: Observable<Guest>;

  constructor(public activeModal: NgbActiveModal, private router: Router, private data:DataService) {
  }

  ngOnInit(): void {
    this.guest = this.data.fetchOne('guests', this.id);
  }

  arrived() {
    console.log(this.guest);
    // this.guest.status = Status.arrived;
    // this.subject.next();
    this.activeModal.close('Close click');
  }

  remove() {
    this.data.removeOne('guests', this.id);
    this.activeModal.close('Close click');
  }
}
