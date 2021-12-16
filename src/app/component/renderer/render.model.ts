import { MnChunk } from '../../chunker.service';

export interface RendererStateModel {
  /**
   * Current chunker index.
   */
  cursor: string | null;
  /**
   * Current chunk status.
   */
  chunk: MnChunk | null;
  /**
   * Number of words to render.
   */
  chunkSize: number;
}
