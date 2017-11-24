import {Component, EventEmitter, Input, Output} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DiscountPolicy} from './discountPolicy';

@Component({
  selector: 'app-discount',
  templateUrl: 'discount.component.html',
  styleUrls: ['discount.component.css']
})
export class DiscountModalComponent {
  @Input() discountPolicy: DiscountPolicy;
  @Input() trainingBasePrice: number;
  @Input() selected: boolean;
  @Output() notify = new EventEmitter<number>();
  discount: number;
  private _discount: number;
  customerPrice: number;
  private _customerPrice: number;
  selectedDiscount = 0;
  private _selectedDiscount: number;

  constructor(private modalService: NgbModal) {
    this.initDefault();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      // Do nothing cause price value already updated
      if (result === 'selectionDone') {
        this.processSelected();
        this.onTrainingSelected();
      }
      this.restoreSelected();
    }, (reason) => {
      this.restoreSelected();
    });
  }

  onTrainingSelected() {
    if (!this.selected) {
      this.selected = true;
    }
    // Send selected discounted price
    this.notify.emit(this.customerPrice);
  }

  private processSelected() {
    this._discount = this.discount;
    this._customerPrice = this.customerPrice;
    this._selectedDiscount = this.selectedDiscount;
  }

  private restoreSelected(): void {
    this.discount = this._discount;
    this.customerPrice = this._customerPrice;
    this.selectedDiscount = this._selectedDiscount;
  }

  private initDefault(): void {
    this.discount = 0;
    this._discount = this.discount;
    this.customerPrice = this.trainingBasePrice;
    this._customerPrice = this.customerPrice;
    this._selectedDiscount = this.selectedDiscount;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public countDiscount(evt): void {
    const dicountSelected = evt.target.value;
    const discount = Number(dicountSelected);
    if (discount > 0) {
      this.discount = Math.round(this.trainingBasePrice * discount / 100);
      this.customerPrice = this.trainingBasePrice - this.discount;
    } else {
      this.discount = 0;
      this.customerPrice = this.trainingBasePrice;
    }
    this.selectedDiscount = dicountSelected;
  }

  public selectionDone(): void {
    console.log('Done');
  }

  openDeleteModal(content): void {
    console.log('delete');
  }
}
