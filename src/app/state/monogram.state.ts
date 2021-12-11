import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { SaveNewForm } from './monogram.actions';
import { MonogramStateModel } from './monogram.model';

const MONOGRAM_STATE_TOKEN = new StateToken<MonogramStateModel>('monogram');

type MnStateContext = StateContext<MonogramState>;

@State<MonogramStateModel>({
  name: MONOGRAM_STATE_TOKEN,
  defaults: {}
})
@Injectable()
export class MonogramState {

  @Action(SaveNewForm)
  saveNewForm(_ctx: MnStateContext) {

  }

}
