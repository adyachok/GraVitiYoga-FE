import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MonthPluralPipe} from './tools/pipes/month.plural.pipe';
import {FormsModule} from '@angular/forms';
import {FitAssistantComponent} from './fit.assistant/fit.assistant.component';
import {SelectionAssistantComponent} from './selection.assistant/selection.assistant.component';
import {TrainingComponent} from './selection.assistant/training.component';
import {TrainingService} from './fit.assistant/service/training.service';
import {DeleteModalComponent} from './selection.assistant/modal/delete.component';
import {DiscountModalComponent} from './selection.assistant/modal/discount.component';
import {InfoModalComponent} from './selection.assistant/modal/info.component';
import {PlanningAssistantComponent} from './planning.assistant/planning.assistant.component';
import {RouterModule} from '@angular/router';
import {SetEventModalComponent} from './planning.assistant/modal/set.event.component';
import {TimepickerComponent} from './tools/timepicker.component';
import {CalculationAssistantComponent} from './calculation.assistant/calculation.assistant.component';
import {TrainingEventSelectionService} from './planning.assistant/services/training.event.selection.service';
import {TrainingSelectService} from './selection.assistant/service/training.select.service';


@NgModule({
  declarations: [
    AppComponent,
    MonthPluralPipe,
    FitAssistantComponent,
    SelectionAssistantComponent,
    TrainingComponent,
    DeleteModalComponent,
    DiscountModalComponent,
    InfoModalComponent,
    PlanningAssistantComponent,
    SetEventModalComponent,
    TimepickerComponent,
    CalculationAssistantComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([
      {path: 'plan', component: PlanningAssistantComponent},
      {path: 'select', component: SelectionAssistantComponent},
      {path: '', redirectTo: 'select',  pathMatch: 'full'},
      // {path: '**', component: PageNotFound}
    ], {useHash: true})
  ],
  providers: [TrainingService, TrainingSelectService, TrainingEventSelectionService],
  bootstrap: [AppComponent],
})
export class AppModule { }
