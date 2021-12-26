import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { PluginListenerHandle } from '@capacitor/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackButtonService implements OnInit, OnDestroy {

  /**
   * Back button event subscription.
   * @private
   */
  subject: Subject<void>;
  /**
   * Back button event listener.
   * @private
   */
  listener: PluginListenerHandle;

  constructor() {
    this.subject = new Subject<void>(); // this needs to be defined
  }

  get event(): Observable<void> {
    return this.subject.asObservable();
  }

  ngOnInit(): void {
    this.listener = App?.addListener('backButton', () => this.subject.next(undefined));
  }

  async ngOnDestroy(): Promise<void> {
    this.subject.complete();
    if (this.listener) {
      await this.listener.remove();
    }
  }

}
