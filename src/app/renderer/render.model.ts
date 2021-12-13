import { MnChunk } from '../chunker.service';

export interface RendererStateModel {
  cursor: string | null;
  isRunning: boolean;
  /**
   * Current chunk status.
   */
  chunk: MnChunk | null;
  /**
   * Number of words to render.
   */
  chunkSize: number;
}
