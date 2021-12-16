import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentComponent } from './component/document';
import { DocumentListItemComponent } from './component/document-list-item';
import { HomeComponent } from './component/home';
import { NavItemComponent } from './component/nav-item';
import { ReaderComponent } from './component/reader';
import { RendererState } from './component/renderer';
import { SettingsComponent } from './component/settings';
import { TapIconComponent } from './component/tap-icon';
import { TextInputComponent } from './component/text-input';
import { FormsState } from './forms';
import { MonogramState } from './state';

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    HomeComponent,
    SettingsComponent,
    DocumentComponent,
    ReaderComponent,
    TapIconComponent,
    DocumentListItemComponent,
    NavItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([
      MonogramState,
      FormsState,
      RendererState,
    ], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'Monogram',
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: [MonogramState],
    }),
    NgxsFormPluginModule.forRoot(),
    FlexLayoutModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatRippleModule,
    NgScrollbarModule,
  ],
  providers: [
    FormGroupDirective,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
