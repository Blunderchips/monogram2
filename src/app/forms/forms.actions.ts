import { ResetForm, SetFormPristine } from '@ngxs/form-plugin';
import {
  FORMS_STATE_TOKEN,
  INPUT_FORM_STATE,
  SETTINGS_FORM_FORM_STATE,
  DOCUMENT_SEARCH_FORM_STATE,
} from './forms.state';

export class SetNewDocumentFormPristine extends SetFormPristine {
  constructor() {
    super(INPUT_FORM_STATE);
  }
}

export class ResetFormState extends ResetForm {
  constructor() {
    super({ path: FORMS_STATE_TOKEN.getName() });
  }
}

export class SetSettingsFormPristine extends SetFormPristine {
  constructor() {
    super(SETTINGS_FORM_FORM_STATE);
  }
}

export class SetSearchFormPristine extends SetFormPristine {
  constructor() {
    super(DOCUMENT_SEARCH_FORM_STATE);
  }
}
