import { Component, Input } from '@angular/core';
import { map, Observable, of } from 'rxjs';

export type RouterLink = Array<any> | null;

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {

  /**
   * Router actions.
   */
  @Input() router: RouterLink;
  /**
   * @default false
   */
  @Input() disabled = of(false);

  get routerLink(): Observable<RouterLink> {
    return this.disabled.pipe(
      map(isDisabled => isDisabled ? null : this.router),
    );
  }

}
