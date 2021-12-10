import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { SaveNewForm } from './monogram.actions';
import { defaultForm, MonogramStateModel } from './monogram.model';

const MONOGRAM_STATE_TOKEN = new StateToken<MonogramStateModel>('monogram');

export const INPUT_FORM_STATE = 'monogram.forms.textInput';

type MnStateContext = StateContext<MonogramState>;

@State<MonogramStateModel>({
  name: MONOGRAM_STATE_TOKEN,
  defaults: {
    forms: {
      textInput: {
        ...defaultForm,
      }
    }
  }
})
@Injectable()
export class MonogramState {

  @Selector()
  static isInputFormDirty(state: MonogramStateModel): boolean {
    return state.forms.textInput.dirty;
  }

  @Action(SaveNewForm)
  saveNewForm(_ctx: MnStateContext) {

  }

}
