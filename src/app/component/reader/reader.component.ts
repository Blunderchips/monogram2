import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { RendererState, StopRenderer, ToggleRenderer } from '../../services/renderer';
import { MnDocument, StorageState } from '../../storage';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnDestroy {

  @Select(RendererState.isRunning) isRunning$: Observable<boolean>;
  @Select(RendererState.cursor) cursor$: Observable<string>;
  @Select(StorageState.selectedDocument) document$: Observable<MnDocument>;

  constructor(
    private store: Store,
  ) {
  }

  get textAlignment(): Observable<TextAlignment> {
    return this.document$.pipe(map(doc => doc?.alignment || 'text-align-center'));
  }

  get textWeight(): Observable<TextWeight> {
    return this.document$.pipe(map(doc => doc?.weight || 'mat-display-4'));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopRenderer());
  }

  click(): void {
    this.store.dispatch(new ToggleRenderer());
  }

}
