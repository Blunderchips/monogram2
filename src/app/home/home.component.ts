import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { v4 as uuid4 } from 'uuid';
import { MonogramState } from '../state';
import { MnDocument } from '../state/monogram.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @Select(MonogramState.documents) documents: Observable<Array<MnDocument>>;

  constructor(
    private router: Router,
  ) {
  }

  newDocument = () => this.router.navigateByUrl(`/document/${uuid4()}`);

}
