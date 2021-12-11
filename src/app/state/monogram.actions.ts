export class SaveNewForm {

  static readonly type = '[New document] save form';

  /**
   * @param {string} id target document UUID
   */
  constructor(public id: string) {
  }

}
