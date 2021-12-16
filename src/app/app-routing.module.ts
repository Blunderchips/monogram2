import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './component/document';
import { HomeComponent } from './component/home';
import { ReaderComponent } from './component/reader';
import { SettingsComponent } from './component/settings';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'document/:id',
    component: DocumentComponent,
  },
  {
    path: 'settings/:id',
    component: SettingsComponent,
  },
  {
    path: 'reader/:id',
    component: ReaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
