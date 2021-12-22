export class ToggleRenderer {
  static readonly type = '[Renderer] toggle running state';
}

export class RendererTick {

  static readonly type = '[Renderer] tick';

  /**
   * @param {number} period Ticket period index/cursor
   */
  constructor(public period: number) {
  }

}

export class StopRenderer {
  static readonly type = '[Renderer] stop current rendering';
}
