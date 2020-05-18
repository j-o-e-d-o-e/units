import {CanDeactivate} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<any> {

  canDeactivate(component: any): boolean {
    if (component.form.dirty) {
      return confirm('Unsaved changes. Discard?');
    }
    return true;
  }
}
