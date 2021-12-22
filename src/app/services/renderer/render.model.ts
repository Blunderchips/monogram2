import { MnChunk } from '../chunker';

export interface RendererStateModel {
  /**
   * Current chunker index.
   */
  cursor: string | null;
  /**
   * Current chunk status.
   */
  chunk: MnChunk | null;
}
