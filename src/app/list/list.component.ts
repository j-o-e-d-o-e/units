import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {Guest, Status} from '../model/guest.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {ModalComponent} from '../modal/modal.component';
import {SettingsService} from '../services/settings.service';
import {AuthService} from '../services/auth/auth.service';
import {Settings} from '../model/settings.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  guests: Observable<{ data: Guest; id: string }[]>;
  status: Status;
  display: boolean;
  success: boolean;
  error: boolean;

  constructor(private data: DataService, private settings: SettingsService, private auth: AuthService,
              private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.status = params.status === 'arrived' ? Status.arrived : Status.booked;
      if (this.status === 'arrived') {
        this.settings.fetch().subscribe((settings: Settings) => {
          if (this.auth.isAdmin()) {
            this.display = settings.display;
          } else {
            this.display = !settings.display_admin_only;
          }
        });
      }
      this.guests = this.data.fetchMany(this.status);
    });
  }

  onAdd() {
    this.router.navigate(['/add', this.status]).catch();
  }

  onEdit(id: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.id = id;
  }

  onArrived() {
    if (confirm('Move all entries to list?')) {
      this.guests.pipe(map(data => {
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
                this.router.navigate(['/list', Status.arrived]).catch();
              }, 1000
            );
          } else {
            this.error = true;
            setTimeout(() => {
                this.error = false;
              }, 3000
            );
          }
        });
      });
    }
  }

  onClear() {
    if (confirm('Clear all entries in list?')) {
      this.guests.pipe(map(data => {
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
              }, 3000
            );
          } else {
            this.error = true;
            setTimeout(() => {
                this.error = false;
              }, 3000
            );
          }
        });
      });
    }
  }
}
