import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Status, Guest} from '../model/guest.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{guest.forename + guest.surname}}</h4>
      <!--      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">-->
      <!--        <span aria-hidden="true">&times;</span>-->
      <!--      </button>-->
    </div>
    <div class="modal-body">
      <p>Date: {{guest.date}} - Status: {{guest.status}}</p>
      <p>Phone: {{guest.phone}} - Friends: {{guest.friends}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-free" *ngIf="guest.status !== 'arrived'" (click)="arrived()">Arrived</button>
      <button type="button" class="btn btn-reserve" *ngIf="guest.status !== 'reserved'" (click)="left()">Left</button>
      <button type="button" class="btn btn-danger" (click)="activeModal.close('Close click')">Cancel</button>
    </div>
  `,
  styles: ['.btn-arrived, .btn-left, .btn-use {margin-right: 10px}',
    '.btn-arrived{background-color: #2298F2; color: white}',
    '.btn-left{background-color: #FFC44B; color: white}',
    '.btn-use{background-color: #82FF35; color: white}',
  ]
})
export class ModalContent {
  @Input()
  guest: Guest;
  subject = new Subject();

  constructor(public activeModal: NgbActiveModal, private router: Router) {
  }

  arrived() {
    this.guest.status = Status.arrived;
    this.subject.next();
    this.activeModal.close('Close click');
  }

  left() {
    this.guest.status = Status.left;
    this.subject.next();
    // this.router.navigate(['/left']);
    this.activeModal.close('Close click');
  }
}
