import { Component, Input } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {

  /**
   * Router actions.
   */
  @Input() routerLink: Array<any>;
  /**
   * @default false
   */
  @Input() disabled = of(false);
}
