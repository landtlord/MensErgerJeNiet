import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {SimpleNotificationsModule} from 'angular2-notifications';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PlayFieldComponent} from './playfield/play-field.component';
import {BoardComponent} from './board/board.component';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {StartDialogComponent} from './start-dialog/start-dialog.component';
import {MatPseudoCheckboxModule} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import { WinnerDialogComponent } from './winner-dialog/winner-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayFieldComponent,
    BoardComponent,
    StartDialogComponent,
    WinnerDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    SimpleNotificationsModule.forRoot(),
    MatPseudoCheckboxModule,
    FormsModule
  ],
  entryComponents: [
    StartDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
