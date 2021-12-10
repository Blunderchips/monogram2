import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * Document text input form.
 */
@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {

  inputForm = new FormGroup({
    name: new FormControl(''),
    textInput: new FormControl(''),
  });

}
