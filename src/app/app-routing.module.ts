import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './component/document';
import { HomeComponent } from './component/home';
import { DisplayComponent } from './component/display';
import { SettingsComponent } from './component/settings';

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutingModule.routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  static routes: Routes = [
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
      component: DisplayComponent,
    },
  ];
}
