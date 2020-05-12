import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {NgForm} from '@angular/forms';
import {Guest, Status} from '../model/guest.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @ViewChild('form')
  form: NgForm;
  private success: boolean;
  private error: boolean;

  constructor(private data: DataService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const guest = new Guest();
    guest.forename = this.form.value.forename;
    guest.surname = this.form.value.surname;
    guest.phone = this.form.value.phone;
    guest.friends = +this.form.value.friends;
    guest.date = new Date();
    guest.status = Status.arrived;
    console.log(guest);
    this.data.push('guests', guest).then(() => {
      this.success = true;
      setTimeout(() => {
          this.success = false;
          this.router.navigate(['arrived']).catch();
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

  onCancel() {
    this.router.navigate(['/arrived']).catch();
  }
}
