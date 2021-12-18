// Maps to classes located in styles.scss
//

/**
 * CSS text-align.
 */
export const ALIGNMENTS: TextAlignments = [
  'text-align-center',
  'text-align-left',
  'text-align-right',
  'text-align-justify',
];

export function GetAlignmentLabel(align: TextAlignment): string {
  switch (align) {
    case 'text-align-center':
      return 'Center text';
    case 'text-align-justify':
      return 'Justify text';
    case 'text-align-left':
      return 'Left align';
    case 'text-align-right':
      return 'Right align';
    default:
      // todo log warning, just in case (...get it?)
      return align; // alignment label not found, should never happen
  }
}
