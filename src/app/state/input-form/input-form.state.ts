import { Injectable } from '@angular/core';
import { State, StateToken } from '@ngxs/store';

export type TextInputFormStateModel = any;

const TEXT_INPUT_FORM_STATE_MODEL = new StateToken<TextInputFormStateModel>('zoo');

@State<TextInputFormStateModel>({
  name: TEXT_INPUT_FORM_STATE_MODEL,
  defaults: {}
})
@Injectable()
export class InputFormState {
}
