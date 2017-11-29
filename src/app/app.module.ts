import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {TrainingTableEntryComponent} from './trainings/training.table-entry.component';
import {TrainingTableComponent} from './trainings/training.table.component';
import {TrainingService} from './trainings/training.service';
import {HttpClientModule} from '@angular/common/http';
import {InfoModalComponent} from './trainings/modal/info.component';
import {DiscountModalComponent} from './trainings/modal/discount.component';
import {TrainingTableEntryManagerComponent} from './trainings/training.table-entry-manager.component';
import {DeleteModalComponent} from './trainings/modal/delete.component';
import {MonthPluralPipe} from './tools/pipes/month.plural.pipe';
import {TimetableComponent} from './timetable/timetable.component';
import {SetEventModalComponent} from './timetable/modal/set.event.component';
import {TimepickerComponent} from './tools/timepicker.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TrainingTableComponent,
    TrainingTableEntryComponent,
    InfoModalComponent,
    DiscountModalComponent,
    TrainingTableEntryManagerComponent,
    DeleteModalComponent,
    MonthPluralPipe,
    TimetableComponent,
    SetEventModalComponent,
    TimepickerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [TrainingService],
  bootstrap: [AppComponent],
})
export class AppModule { }
