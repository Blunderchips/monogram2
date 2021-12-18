// Type definitions for monogram

type UUID = string;

/**
 * CSS text-align. Maps to classes located in styles.scss.
 */
type TextAlignment =
  'text-align-left' |
  'text-align-right' |
  'text-align-center' |
  'text-align-justify';

type TextAlignments = Array<TextAlignment>;

/**
 * Maps to Angular material typography classes.
 */
type TextWeight =
  'mat-display-4' |
  'mat-display-3' |
  'mat-display-2' |
  'mat-display-1' |
  'mat-h1' |
  'mat-h2' |
  'mat-h3' |
  'mat-h4' |
  'mat-body-1' |
  'mat-small';

type TextWeights = Array<TextWeight>;
