import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { RendererService, RendererState } from '../../services/renderer';
import { MnDocument, StorageState } from '../../storage';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent {

  @Select(RendererState.isRunning) isRunning$: Observable<boolean>;
  @Select(RendererState.cursor) cursor$: Observable<string>;
  @Select(StorageState.selectedDocument) document$: Observable<MnDocument>;

  constructor(
    private renderer: RendererService,
  ) {
  }

  get textAlignment(): Observable<TextAlignment> {
    return this.document$.pipe(map(doc => doc?.alignment || 'text-align-center'));
  }

  get textWeight(): Observable<TextWeight> {
    return this.document$.pipe(map(doc => doc?.weight || 'mat-display-4'));
  }

  click(): void {
    this.renderer.start()
  }

}
