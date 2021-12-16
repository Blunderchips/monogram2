import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  get getDocumentId(): Observable<string | null> {
    return this.route.paramMap.pipe(map(i => i.get('id')));
  }

}
