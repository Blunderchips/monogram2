import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';
import { isEqual } from 'lodash-es';
import { MnDocument, StorageState } from '../../storage';
import { ChunkerService } from '../chunker';
import { RendererStateModel } from './render.model';
import { RendererTick, StopRenderer, ToggleRenderer } from './renderer.actions';
import { RendererService } from './renderer.service';

/**
 * Render NGXS state token.
 */
const RENDERER_STATE_TOKEN = new StateToken<RendererStateModel>('renderer');

type RendererStateContext = StateContext<RendererStateModel>;

// noinspection JSMethodCanBeStatic
@State<RendererStateModel>({
  name: RENDERER_STATE_TOKEN,
  defaults: {
    segment: 0,
    cursor: 0,
    chunk: ChunkerService.NULL_CHUNK,
  }
})
@Injectable()
export class RendererState {

  constructor(
    private chunker: ChunkerService,
    private store: Store,
    private renderer: RendererService,
  ) {
  }

  @Selector()
  static cursor(state: RendererStateModel): string | null {
    return state.chunk?.chunk || null;
  }

  @Selector()
  static isRunning(state: RendererStateModel): boolean {
    return !isEqual(state?.chunk, ChunkerService.NULL_CHUNK);
  }

  @Action(ToggleRenderer)
  toggleRunning(ctx: RendererStateContext): void {
    const isRunning: boolean = this.store.selectSnapshot(RendererState.isRunning);
    if (isRunning) {
      this.#stop(ctx);
    } else {
      this.#start(ctx);
    }
  }

  @Action(RendererTick)
  tick(ctx: RendererStateContext, _action: RendererTick): void {

    const doc: MnDocument | null = this.store.selectSnapshot(StorageState.selectedDocument);
    // console.debug({ doc });

    if (!doc) {
      this.#stop(ctx);
      return;
    }

    const {
      chunkSize,
    } = doc;

    const {
      cursor,
      segment,
    } = ctx.getState();

    const newChunk = this.chunker.chunk(doc.textInput, chunkSize, segment, cursor * chunkSize);
    ctx.patchState({ chunk: newChunk, cursor: cursor + 1 });

    if (!newChunk?.hasNextChunk && newChunk?.chunk?.length <= 0) {
      if (newChunk?.hasNextSegment) {
        ctx.patchState({
          cursor: 0, // reset for start of new segment
          segment: segment + 1,
        })
        ctx.dispatch(new RendererTick(0)); // refresh renderer to display first chunk of the new segment
      } else {
        this.#stop(ctx); // end of document
      }
    }

  }

  @Action(StopRenderer)
  stopRenderer(ctx: RendererStateContext): void {
    this.#stop(ctx);
  }

  #start(ctx: RendererStateContext): void {
    this.#reset(ctx);
    this.renderer.start();
  }

  #stop(ctx: RendererStateContext): void {
    this.#reset(ctx);
    this.renderer.stop();
  }

  #reset(ctx: RendererStateContext):void {
    ctx.patchState({
      chunk: ChunkerService.NULL_CHUNK,
      cursor: 0,
      segment: 0,
    });
  }

}
