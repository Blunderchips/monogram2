import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
  ) {
  }

  newDocument = () => this.router.navigateByUrl(`/document/${uuid4()}`);

}
