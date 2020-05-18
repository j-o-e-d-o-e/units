import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {SettingsService} from '../services/settings.service';
import {Settings} from '../model/settings.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  @ViewChild('form')
  form: NgForm;
  settings: Settings;
  loading: boolean;
  success: boolean;
  error: boolean;

  constructor(private data: SettingsService, private location: Location) {
  }

  ngOnInit() {
    this.loading = true;
    this.data.fetch().subscribe(settings => {
      this.settings = settings;
      this.loading = false;
    });
  }

  onSubmit() {
    if (!this.settings.display) {
      this.settings.display_users = false;
    }
    this.data.update(this.settings).then(() => {
      this.success = true;
      setTimeout(() => {
          this.success = false;
          this.location.back();
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
    this.location.back();
  }
}
