import {Training} from './training';
import {Component} from '@angular/core';


@Component({
  selector: 'app-training-table',
  templateUrl: 'training.table.html',
  styleUrls: ['training.table.css']
})
export class TrainingTableComponent {
  trainings: Training[];
  total: number;

  constructor() {
    this.total = 0;
    this.trainings = [
      { name: 'Tренировка GraVitiYoga в группе',
        price: 223,
        isSelected: false,
        image: '../../assets/img/retreat.jpeg' },
      { name: 'Урок GraVitiYoga с персональным инструктором',
        price: 345,
        isSelected: false,
        image: '../../assets/img/yoga_pair.jpeg' },
      { name: 'Урок классической йоги (дыхание, равновесие, растяжки)',
        price: 223,
        isSelected: false,
        image: '../../assets/img/yoga_sea.jpeg' },
      { name: 'Массаж шведи, спортивный или классический',
        price: 273,
        isSelected: false,
        image: '../../assets/img/massage.jpeg' },
      { name: 'Массаж интуитивный',
        price: 267,
        isSelected: false,
        image: '../../assets/img/lotus.jpeg' },
      { name: 'Программа индивидуального моделирования тела',
        price: 543,
        isSelected: false,
        image: '../../assets/img/ideal_body_composition_1.jpg' },
      { name: 'Реабилитация или коррекция тела (суставы, позвоночник, связки)',
        price: 1003,
        isSelected: false,
        image: '../../assets/img/yoga_pair.jpeg' },
      { name: 'Занятия на тренажерах “ПравИло” и “Лебедь”',
        price: 777,
        isSelected: false,
        image: '../../assets/img/flying-yoga.jpeg' },
      { name: 'Курс тета-хиллинг',
        price: 678,
        isSelected: false,
        image: '../../assets/img/rehabilitation.jpeg' },
      { name: 'Лайф-коучинг сопровождение',
        price: 480,
        isSelected: false,
        image: '../../assets/img/coaching.jpeg' },
      { name: 'Консультации по питанию и здоровому образу жизни',
        price: 113,
        isSelected: false,
        image: '../../assets/img/meal.jpeg' }
    ];
  }
  onNotify(training: Training) {
    if (training.isSelected) {
      this.total += training.price;
    } else {
      this.total -= training.price;
    }
  }
}
