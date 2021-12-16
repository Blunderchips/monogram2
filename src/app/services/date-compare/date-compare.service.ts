import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { MnDocument } from '../../state/monogram.model';

@Injectable({
  providedIn: 'root'
})
export class DateCompareService {

  compare(a: MnDocument, b: MnDocument): number {

    const dateA = dayjs(a?.updated);
    const dateB = dayjs(b?.updated);

    if (dateA.isSame(dateB)) {
      return 0;
    } else if (dateA.isAfter(dateB)) {
      return -1;
    } else if (dateA.isBefore(dateB)) {
      return 1;
    }

    throw Error(); // todo add error message, should never happen
  }

}
