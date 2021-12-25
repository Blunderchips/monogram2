import { MnChunk } from '../chunker';

export interface RendererStateModel {
  /**
   * Current chunker index.
   */
  cursor: number;
  /**
   * Current segment index.
   */
  segment: number;
  /**
   * Current chunk status.
   */
  chunk: MnChunk | null;
}
