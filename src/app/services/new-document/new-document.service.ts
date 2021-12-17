import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class NewDocumentService extends BehaviorSubject<string> {

  constructor() {
    super(uuid4()); // default to a newly generated UUID
  }

  override next() {
    super.next(uuid4());
  }

}
