import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './document/document.component';
import { HomeComponent } from './home/home.component';
import { NewDocumentComponent } from './new-document/new-document.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path:'home',
    component: HomeComponent,
  },
  {
    path: 'doc/:id',
    component:DocumentComponent,
  },
  {
    path: 'settings/:id',
    component:SettingsComponent,
  },
  {
    path: 'new',
    component:NewDocumentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
