import {TrainingEvent} from '../model/training.event.model';
import {Renderer2} from '@angular/core';

export class TrainingEventRendererHelper {

  constructor(private renderer2: Renderer2) {}

  selectCell(cell: Element): void {
    // Cell is event.target.nextElementSibling
    this.renderer2.addClass(cell, 'selected');
  }

  unselectCell(cell: Element): void {
    this.renderer2.removeClass(cell, 'selected');
  }

  appendTrainingEventHTML(eventTarget: Element, trainingEvent: TrainingEvent): void {
    const trainingRow = eventTarget.querySelector('.training-name');
    if (trainingRow) {
      trainingRow.innerHTML = '';
      const span = this.renderer2.createElement('span');
      this.renderer2.addClass(span, 'training-name');
      const text = this.renderer2.createText(trainingEvent.trainingName);
      this.renderer2.appendChild(span, text);
      this.renderer2.appendChild(trainingRow, span);
    }
  }

  removeTrainingHTMLElement(cell: Element): void {
    const trainingRow = cell.querySelector('.training-name');
    if (trainingRow) {
      trainingRow.innerHTML = '';
      const span = this.renderer2.createElement('span');
      this.renderer2.addClass(span, 'point');
      const text = this.renderer2.createText('.');
      this.renderer2.appendChild(span, text);
      this.renderer2.appendChild(trainingRow, span);
    }
  }
}
