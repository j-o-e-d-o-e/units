import {CanDeactivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {AvailableComponent} from '../available/available.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<AvailableComponent> {

  canDeactivate(component: AvailableComponent): boolean {
    if (component.changed) {
      return confirm('Unsaved changes. Discard?');
    }
    return true;
  }
}
