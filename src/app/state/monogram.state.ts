import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { FormsState } from '../forms';
import { SetNewDocumentFormPristine } from '../forms/forms.actions';
import { SaveNewForm } from './monogram.actions';
import { MnDocument, MonogramStateModel } from './monogram.model';

const MONOGRAM_STATE_TOKEN = new StateToken<MonogramStateModel>('monogram');

type MnStateContext = StateContext<MonogramStateModel>;

@State<MonogramStateModel>({
  name: MONOGRAM_STATE_TOKEN,
  defaults: {
    documents: [],
  }
})
@Injectable()
export class MonogramState {

  constructor(private store: Store) {
  }

  @Action(SaveNewForm)
  saveNewForm(ctx: MnStateContext, action: SaveNewForm) {

    const values = this.store.selectSnapshot(FormsState.textInputForm);
    const documents: Array<MnDocument> = [...ctx.getState().documents];

    if (!values.model) {
      return; // todo handle better
    }

    const newDoc: MnDocument = {
      ...values.model,
      id: action.id,
    };

    const i = documents.findIndex(i => i.id === newDoc.id);
    if (i > -1) documents[i] = newDoc;
    else documents.push(newDoc);

    ctx.patchState({ documents });

    ctx.dispatch([
      new SetNewDocumentFormPristine(),
    ]);
  }

}
