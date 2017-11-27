import {Component, Input} from '@angular/core';
import {Training} from './training';

@Component({
  selector: 'app-training-entry-manager',
  templateUrl: 'training.table-entry-manager.component.html',
  styleUrls: ['training.table-entry-manager.component.css']
})

export class TrainingTableEntryManagerComponent {
  @Input() training: Training;
  @Input() canDelete: boolean;
}
