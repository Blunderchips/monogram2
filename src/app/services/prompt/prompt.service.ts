import { Injectable } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { from, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PromptService {

  confirm(title: string, message: string): Observable<boolean> {
    return from(Dialog.confirm({
      title,
      message,
    })).pipe(
      map(result => result.value)
    );
  }

}
