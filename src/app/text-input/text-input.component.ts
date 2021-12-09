import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AfterViewInit, Component, ElementRef, NgZone, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-text-input', templateUrl: './text-input.component.html', styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements AfterViewInit {

  textAreaSize = 0;

  @ViewChild('spacer') spacerElement!: ElementRef<HTMLSpanElement>;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  inputForm = new FormGroup({
    name: new FormControl(''), textInput: new FormControl(''),
  });

  constructor(private _ngZone: NgZone,) {
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const {
        nativeElement: {
          clientHeight
        }
      } = this.spacerElement;
      console.log(clientHeight);
      // Throws an error when run.
      this.textAreaSize = Math.round(clientHeight / 18);
      console.log(Math.round(clientHeight / 18));
    }, 1);
  }

}
