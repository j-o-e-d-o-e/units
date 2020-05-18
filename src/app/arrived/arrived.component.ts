import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {Guest, Status} from '../model/guest.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {ModalComponent} from '../modal/modal.component';
import {SettingsService} from '../services/settings.service';
import {AuthService} from '../services/auth/auth.service';


@Component({
  selector: 'app-arrived',
  templateUrl: './arrived.component.html',
  styleUrls: ['./arrived.component.css']
})
export class ArrivedComponent implements OnInit {
  guests: Observable<{ data: Guest; id: string }[]>;
  display: boolean;
  success: boolean;
  error: boolean;

  constructor(private data: DataService, private settings: SettingsService, private auth: AuthService,
              private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.settings.fetch().subscribe(settings => {
      if (this.auth.isAdmin()) {
        this.display = settings.display;
      } else {
        this.display = !settings.display_admin_only;
      }
    });
    this.guests = this.data.fetchMany(Status.arrived);
  }

  onAdd() {
    this.router.navigate(['/arrived-new']).catch();
  }

  onEdit(id: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.id = id;
  }

  onClear() {
    if (confirm('Clear all entries in list?')) {
      this.data.fetchMany(Status.arrived).pipe(map(data => {
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
