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


@NgModule({
  declarations: [
    AppComponent,
    TrainingTableComponent,
    TrainingTableEntryComponent,
    InfoModalComponent,
    DiscountModalComponent,
    TrainingTableEntryManagerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [TrainingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
