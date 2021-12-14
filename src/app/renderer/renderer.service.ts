import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { interval, Observable, Subscription, tap } from 'rxjs';
import { RendererTick } from './renderer.actions';

@Injectable({
  providedIn: 'root'
})
export class RendererService implements OnDestroy {

  /**
   * Renderer subscription.
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

  #newTicket(): Observable<number> {
    return interval(0.5 * 1000).pipe(tap(period => this.store.dispatch(new RendererTick(period))));
  }

}
