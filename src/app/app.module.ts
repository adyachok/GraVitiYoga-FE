import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {TrainingTableEntryComponent} from './trainings/training.table-entry.component';
import {TrainingTableComponent} from './trainings/training.table.component';


@NgModule({
  declarations: [
    AppComponent,
    TrainingTableComponent,
    TrainingTableEntryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
