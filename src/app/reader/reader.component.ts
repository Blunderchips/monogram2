import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RendererService, RendererState, ToggleRunning } from '../renderer';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent {

  @Select(RendererState.isRunning) isRunning$: Observable<boolean>;
  @Select(RendererState.cursor) cursor$: Observable<string>;

  constructor(
    private store: Store,
    private renderer: RendererService,
  ) {
  }

  click(): void {
    this.store.dispatch(new ToggleRunning());
    this.renderer.start()
  }

}
