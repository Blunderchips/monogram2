import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';
import { ChunkerService } from '../../services/chunker';
import { MnDocument, StorageState } from '../../storage';
import { RendererStateModel } from './render.model';
import { RendererTick, ToggleRunning } from './renderer.actions';

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
      return; // todo handle better
    }

    const {
      period,
    } = action;

    const {
      chunkSize,
    } = ctx.getState();

    const newChunk = this.chunker.chunk(doc.textInput, chunkSize, 0, period * chunkSize);
    ctx.patchState({ chunk: newChunk });
  }

}
