import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';
import { MnDocument, StorageState } from '../../storage';
import { ChunkerService } from '../chunker';
import { RendererStateModel } from './render.model';
import { RendererTick, ToggleRunning } from './renderer.actions';
import { RendererService } from './renderer.service';

/**
 * Render NGXS state token.
 */
const RENDERER_STATE_TOKEN = new StateToken<RendererStateModel>('renderer');

type RendererStateContext = StateContext<RendererStateModel>;

@State<RendererStateModel>({
  name: RENDERER_STATE_TOKEN,
  defaults: {
    cursor: null,
    chunk: ChunkerService.NULL_CHUNK,
    chunkSize: 4,
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
    return state.chunk?.chunk !== '';
  }

  @Action(ToggleRunning)
  toggleRunning(_ctx: RendererStateContext): void {
    // const {
    //   isRunning,
    // } = ctx.getState();
    // ctx.patchState({
    //   isRunning: !isRunning,
    // });
  }

  @Action(RendererTick)
  tick(ctx: RendererStateContext, action: RendererTick): void {

    const doc: MnDocument | null = this.store.selectSnapshot(StorageState.selectedDocument);
    // console.debug({ doc });

    if (!doc) {
      ctx.patchState({
        chunk: ChunkerService.NULL_CHUNK,
      });
      this.renderer.stop();
      return;
    }

    const {
      period,
    } = action;

    const {
      chunkSize,
    } = ctx.getState();

    const newChunk = this.chunker.chunk(doc.textInput, chunkSize, 0, period * chunkSize);
    ctx.patchState({ chunk: newChunk });

    if (!newChunk?.hasNextChunk && newChunk?.chunk?.length <= 0) {
      this.renderer.stop(); // end of document
    }

  }

}
