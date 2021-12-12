import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RendererState, ToggleRunning } from '../renderer';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent {

  @Select(RendererState.isRunning) isRunning$: Observable<boolean>;

  constructor(private store: Store) {
  }

  click(): void {
    this.store.dispatch(new ToggleRunning());
  }

}
