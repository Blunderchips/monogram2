import { MnChunk } from '../../services/chunker';

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
