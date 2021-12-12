import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { RendererStateModel } from './render.model';
import { ToggleRunning } from './renderer.actions';

/**
 * Render NGXS state token.
 */
const MONOGRAM_STATE_TOKEN = new StateToken<RendererStateModel>('renderer');

type RendererStateContext = StateContext<RendererStateModel>;

@State<RendererStateModel>({
  name: MONOGRAM_STATE_TOKEN,
  defaults: {
    cursor: null,
    isRunning: false,
  }
})
@Injectable()
export class RendererState {

  @Selector()
  static cursor(state: RendererStateModel): string | null {
    return state.cursor;
  }

  @Selector()
  static isRunning(state: RendererStateModel): boolean {
    return state.isRunning;
  }

  @Action(ToggleRunning)
  toggleRunning(ctx: RendererStateContext): void {
    const {
      isRunning,
    } = ctx.getState();
    ctx.patchState({
      isRunning: !isRunning,
    });
  }

}
