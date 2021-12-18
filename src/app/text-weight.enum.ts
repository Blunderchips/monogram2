export const WEIGHTS: TextWeights = [
  'mat-display-4',
  'mat-display-3',
  'mat-display-2',
  'mat-display-1',
  'mat-h1',
  'mat-h2',
  'mat-h3',
  'mat-h4',
  'mat-body-1',
  'mat-small',
];

export function GetWeightLabel(weight: TextWeight): string {
  switch (weight) {
    case 'mat-display-4':
      return '112px/112px';
    case 'mat-display-3':
      return '56px/56px';
    case 'mat-display-2':
      return '45px/48px';
    case 'mat-display-1':
      return '34px/40px';
    case 'mat-h1':
      return '24px/32px';
    case 'mat-h2':
      return '20px/32px';
    case 'mat-h3':
      return '16px/28px';
    case 'mat-h4':
      return '15px/24px';
    case 'mat-body-1':
      return '14px/20px';
    case 'mat-small':
      return '12px/20px';
    default:
      // todo log warning, just in case (...get it?)
      return weight; // alignment label not found, should never happen
  }
}
