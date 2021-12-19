export class SaveNewForm {

  static readonly type = '[Forms] save input form';

  /**
   * @param {string} id target document UUID
   */
  constructor(public id: string | null) {
  }

}

export class SelectDocument {

  static readonly type = '[Forms] save form';

  /**
   * @param {string} id target document UUID
   */
  constructor(public id: string | null) {
  }

}

export class SaveSettingsForm {

  static readonly type = '[Forms] save settings form';

  /**
   * @param {string} id target document UUID
   */
  constructor(public id: string | null) {
  }

}

export class DeleteDocument {

  static readonly type = '[Storage] delete document';

  /**
   * @param {string} id target document UUID
   */
  constructor(public id: string | null) {
  }

}
