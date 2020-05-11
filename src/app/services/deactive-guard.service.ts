import {CanDeactivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {ArrivedComponent} from '../arrived/arrived.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ArrivedComponent> {

  canDeactivate(component: ArrivedComponent): boolean {
    if (component.changed) {
      return confirm('Unsaved changes. Discard?');
    }
    return true;
  }
}
