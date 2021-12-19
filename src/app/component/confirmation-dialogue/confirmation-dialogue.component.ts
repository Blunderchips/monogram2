import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmationDialogue {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirmation-dialogue',
  templateUrl: './confirmation-dialogue.component.html',
  styleUrls: ['./confirmation-dialogue.component.scss']
})
export class ConfirmationDialogueComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogue,
    public ref: MatDialogRef<ConfirmationDialogueComponent>,
  ) {
  }

}
