import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentComponent } from './document/document.component';
import { FormsState } from './forms';
import { HomeComponent } from './home/home.component';
import { ReaderComponent } from './reader/reader.component';
import { SettingsComponent } from './settings/settings.component';
import { MonogramState } from './state';
import { TextInputComponent } from './text-input/text-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    HomeComponent,
    SettingsComponent,
    DocumentComponent,
    ReaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([
      MonogramState,
      FormsState,
    ], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'Monogram',
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: ['monogram'],
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
  ],
  providers:[
    FormGroupDirective,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
