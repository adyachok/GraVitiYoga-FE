import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {TrainingTableEntryComponent} from './trainings/training.table-entry.component';
import {TrainingTableComponent} from './trainings/training.table.component';
import {TrainingService} from './trainings/training.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    TrainingTableComponent,
    TrainingTableEntryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [TrainingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
