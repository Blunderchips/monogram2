import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RendererService, RendererState } from '../../services/renderer';

@UntilDestroy()
@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  @Select(RendererState.isRunning) isRunning$: Observable<boolean>;
  @Select(RendererState.cursor) cursor$: Observable<string>;

  constructor(
    private store: Store,
    private renderer: RendererService,
  ) {
  }

  ngOnInit(): void {
    // this.isRunning$.pipe(
    //   untilDestroyed(this),
    // ).subscribe(isRunning => {
    //   if (!isRunning) {
    //     this.renderer.stop();
    //   }
    // })
  }

  click(): void {
    // this.store.dispatch(new ToggleRunning());
    this.renderer.start()
  }

}
