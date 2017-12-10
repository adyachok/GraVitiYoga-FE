import {TrainingEvent} from '../model/training.event.model';
import {ElementRef, Renderer2} from '@angular/core';

export class TrainingEventRendererHelper {

  constructor(private renderer2: Renderer2) {}

  selectCell(cell: any): void {
    // Cell is event.target.nextElementSibling
    this.renderer2.addClass(cell, 'selected');
  }

  unselectCell(cell: any): void {
    this.renderer2.removeClass(cell, 'selected');
  }

  buildTrainingHTMLElement(trainingEvent: TrainingEvent): ElementRef {
    const row = this.renderer2.createElement('div');
    this.renderer2.addClass(row, 'row');
    this.renderer2.addClass(row, 'training-name');

    const col = this.renderer2.createElement('div');
    this.renderer2.addClass(col, 'col-sm-12');
    const text = this.renderer2.createText(trainingEvent.trainingName);
    this.renderer2.appendChild(col, text);

    this.renderer2.appendChild(row, col);
    return row;
  }

  appendTrainingEventHTML(eventTarget: ElementRef, trainingEventHTML: ElementRef) {
    this.renderer2.appendChild(eventTarget, trainingEventHTML);
  }

  setDataTrainingElement(eventTarget: ElementRef, trainingEvt: TrainingEvent) {
    this.renderer2.setAttribute(eventTarget, 'data-training-name', trainingEvt.trainingName);
  }

  removeTrainingHTMLElement(cell: any) {
    const trainingRow = cell.querySelector('.training-name');
    if (trainingRow) {
      this.renderer2.removeChild(cell, trainingRow);
    }
  }

  getSiblings(cell: any): any[] {
    const parent = this.renderer2.parentNode(cell);
    const children = [];
    for (const node of parent.childNodes) {
      if (node.nodeName === 'DIV') {
        const klass = node.attributes['class'];
        if ( klass && klass.value.split(' ')[0] === 'timeslot') {
          children.push(node);
        }
      }
    }
    return children;
  }
}
