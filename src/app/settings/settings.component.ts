import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {SettingsService} from '../services/settings.service';
import {Settings} from '../model/settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  success: boolean;
  error: boolean;

  constructor(private data: SettingsService, private location: Location) {
  }

  ngOnInit() {
    this.data.fetch().subscribe(settings => {
      this.settings = settings;
    });
  }

  onSubmit() {
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