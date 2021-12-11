import { SetFormPristine } from '@ngxs/form-plugin';
import { INPUT_FORM_STATE } from './forms.state';

export class SetNewDocumentFormPristine extends SetFormPristine {
  constructor() {
    super(INPUT_FORM_STATE);
  }
}
