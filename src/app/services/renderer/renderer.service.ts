import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { round } from 'lodash-es';
import { interval, Observable, of, Subscription, tap } from 'rxjs';
import { MnDocument, StorageState } from '../../storage';
import { RendererTick } from './renderer.actions';

@Injectable({ providedIn: 'root' })
export class RendererService implements OnDestroy {

  /**
   * Renderer interval subscription.
   *
   * @private
   */
  #ticker: Subscription | null;

  constructor(private store: Store) {
  }

  get ticker(): Subscription | null {
    return this.#ticker;
  }

  set ticker(ticker: Subscription | null) {
    if (!ticker && this.#ticker) {
      this.#ticker.unsubscribe();
    }
    this.#ticker = ticker;
  }

  ngOnDestroy(): void {
    this.stop();
  }

  start(): void {
    this.ticker = this.#newTicket().subscribe();
  }

  stop(): void {
    this.ticker = null;
  }

  wordsPerMinuteToMilliseconds(wordsPerMinute: number): number {
    if (!wordsPerMinute || wordsPerMinute <= 0) {
      return 0;
    }
    return round((60 / wordsPerMinute) * 1000, 2);
  }

  #newTicket(): Observable<number | null> {
    const doc: MnDocument | null = this.store.selectSnapshot(StorageState.selectedDocument);
    if (!doc) {
      return of(null);
    }
    const wordsPerMinute: number = this.wordsPerMinuteToMilliseconds(doc.wordsPerMinute);
    return interval(wordsPerMinute).pipe(tap(period => this.store.dispatch(new RendererTick(period))));
  }

}
