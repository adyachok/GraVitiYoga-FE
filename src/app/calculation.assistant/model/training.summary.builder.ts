import {SelectedTraining} from '../../fit.assistant/model/selected.training.model';
import {TrainingSummary} from './training.summary.model';

export class TrainingSummaryBuilder {
  public static fromSelectedTraining(training: SelectedTraining): TrainingSummary {
    const summary = new TrainingSummary();
    summary.trainingName = training.trainingName;
    summary.duration = training.duration;
    summary.selected = training.selected;
    return summary;
  }
}
