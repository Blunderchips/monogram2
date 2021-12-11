import { UpdateFormDirty } from '@ngxs/form-plugin';
import { INPUT_FORM_STATE } from './forms.state';

export class UpdateNewDocumentFormDirty extends UpdateFormDirty {
  constructor(dirty: boolean) {
    super({ dirty, path: INPUT_FORM_STATE });
  }
}
