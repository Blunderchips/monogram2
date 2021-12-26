import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';

/**
 * Angular router link path.
 */
export type RouterLink = Array<any> | null;

// todo: null checks on inputs

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {

  /**
   * Router link.
   */
  @Input() link: RouterLink;
  /**
   * @default false
   */
  @Input() disabled = of(false);
  /**
   * Material icon to use. Cannot be null.
   */
  @Input() matIcon: string;

  constructor(private router: Router) {
  }

  get routerLink(): Observable<RouterLink> {
    return this.disabled.pipe(
      map(isDisabled => isDisabled ? null : this.link),
    );
  }

  get active(): boolean {
    if (!this.link) {
      return false; // a null link cannot be active
    }
    return this.router.url.includes(this.link[1]);
  }

  get colour(): ThemePalette {
    return this.active ? 'primary' : undefined;
  }

}
