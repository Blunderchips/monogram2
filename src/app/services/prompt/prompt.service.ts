import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { ConfirmationDialogue, ConfirmationDialogueComponent } from '../../component/confirmation-dialogue';

@Injectable({ providedIn: 'root' })
export class PromptService {

  constructor(private dialogue: MatDialog) {
  }

  confirm(title: string, message: string): Observable<boolean> {
    return this.dialogue.open<ConfirmationDialogueComponent, ConfirmationDialogue, boolean>(ConfirmationDialogueComponent, {
      data: {
        title,
        message,
      }
    }).afterClosed()
      .pipe(
        map(res => !!res)
      );
  }

}
