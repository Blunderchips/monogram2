import { Component } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { v4 as uuid4 } from 'uuid';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  folders: Section[] = [{
    name: 'Photos', updated: new Date('1/1/16'),
  }, {
    name: 'Recipes', updated: new Date('1/17/16'),
  }, {
    name: 'Work', updated: new Date('1/28/16'),
  },];
  notes: Section[] = [{
    name: 'Vacation Itinerary', updated: new Date('2/20/16'),
  }, {
    name: 'Kitchen Remodel', updated: new Date('1/18/16'),
  },];

  constructor(private store: Store) {
  }

  newDocument = () => this.store.dispatch(new Navigate(['/', 'document', uuid4()]));

}
