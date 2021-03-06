import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Training} from '../model/training.model';

@Injectable()
export class TrainingService {
  private _trainingsUrl = '../resources/trainings.json';
  constructor(private _http: HttpClient) {}

  public getTrainings(): Observable<Training[]> {
    return this._http.get<Training[]>(this._trainingsUrl)
    // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.message);
  }

  public getTrainingsMock(): Observable<Training[]> {
    return Observable.of([
        {
          'name': 'Tренировка GraVitiYoga в группе',
          'price': 223,
          'image': '../../assets/img/retreat.jpeg',
          'shortDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
          'laboris nisi ut aliquip ex ea commodo consequat.',
          'discountPolicy': {
            'name': '',
            'description': '',
            'discounts': [{ 'month': 3, 'rate': 0}, { 'month': 6, 'rate': 10}, { 'month': 12, 'rate': 20}]
          }
        },
        {
          'name': 'Урок GraVitiYoga с персональным инструктором',
          'price': 345,
          'image': '../../assets/img/yoga_pair.jpeg',
          'shortDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
          'laboris nisi ut aliquip ex ea commodo consequat.',
          'discountPolicy': {
            'name': '',
            'description': '',
            'discounts': [{ 'month': 3, 'rate': 0}, { 'month': 6, 'rate': 10}, { 'month': 12, 'rate': 20}]
          }
        },
        {
          'name': 'Урок классической йоги (дыхание, равновесие, растяжки)',
          'price': 223,
          'image': '../../assets/img/yoga_sea.jpeg',
          'shortDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
          'laboris nisi ut aliquip ex ea commodo consequat.',
          'discountPolicy': {
            'name': '',
            'description': '',
            'discounts': [{ 'month': 3, 'rate': 0}, { 'month': 6, 'rate': 10}, { 'month': 12, 'rate': 20}]
          }
        },
        {
          'name': 'Массаж шведи, спортивный или классический',
          'price': 273,
          'image': '../../assets/img/massage.jpeg',
          'shortDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
          'laboris nisi ut aliquip ex ea commodo consequat.',
          'discountPolicy': {
            'name': '',
            'description': '',
            'discounts': [{ 'month': 3, 'rate': 0}, { 'month': 6, 'rate': 10}, { 'month': 12, 'rate': 20}]
          }
        },
        {
          'name': 'Массаж интуитивный',
          'price': 267,
          'image': '../../assets/img/lotus.jpeg',
          'shortDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' +
          ' incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco' +
          ' laboris nisi ut aliquip ex ea commodo consequat.',
          'discountPolicy': {
            'name': '',
            'description': '',
            'discounts': [{ 'month': 3, 'rate': 0}, { 'month': 6, 'rate': 10}, { 'month': 12, 'rate': 20}]
          }
        },
        {
          'name': 'Программа индивидуального моделирования тела',
          'price': 543,
          'image': '../../assets/img/ideal_body_composition_1.jpg',
          'shortDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
          'laboris nisi ut aliquip ex ea commodo consequat.',
          'discountPolicy': {
            'name': '',
            'description': '',
            'discounts': [{ 'month': 3, 'rate': 0}, { 'month': 6, 'rate': 10}, { 'month': 12, 'rate': 20}]
          }
        },
        {
          'name': 'Реабилитация или коррекция тела (суставы, позвоночник, связки)',
          'price': 1003,
          'image': '../../assets/img/yoga_pair.jpeg',
          'shortDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
          'laboris nisi ut aliquip ex ea commodo consequat.',
          'discountPolicy': {
            'name': '',
            'description': '',
            'discounts': [{ 'month': 3, 'rate': 0}, { 'month': 6, 'rate': 10}, { 'month': 12, 'rate': 20}]
          }
        },
        {
          'name': 'Занятия на тренажерах “ПравИло” и “Лебедь”',
          'price': 777,
          'image': '../../assets/img/flying-yoga.jpeg',
          'shortDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
          'laboris nisi ut aliquip ex ea commodo consequat.',
          'discountPolicy': {
            'name': '',
            'description': '',
            'discounts': [{ 'month': 3, 'rate': 0}, { 'month': 6, 'rate': 10}, { 'month': 12, 'rate': 20}]
          }
        },
        {
          'name': 'Курс тета-хиллинг',
          'price': 678,
          'image': '../../assets/img/rehabilitation.jpeg',
          'shortDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
          'laboris nisi ut aliquip ex ea commodo consequat.',
          'discountPolicy': {
            'name': '',
            'description': '',
            'discounts': [{ 'month': 3, 'rate': 0}, { 'month': 6, 'rate': 10}, { 'month': 12, 'rate': 20}]
          }
        },
        {
          'name': 'Лайф-коучинг сопровождение',
          'price': 480,
          'image': '../../assets/img/coaching.jpeg',
          'shortDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
          'laboris nisi ut aliquip ex ea commodo consequat.',
          'discountPolicy': {
            'name': '',
            'description': '',
            'discounts': [{ 'month': 3, 'rate': 0}, { 'month': 6, 'rate': 10}, { 'month': 12, 'rate': 20}]
          }
        },
        {
          'name': 'Консультации по питанию и здоровому образу жизни',
          'price': 113,
          'image': '../../assets/img/meal.jpeg',
          'shortDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
          'laboris nisi ut aliquip ex ea commodo consequat.',
          'discountPolicy': {
            'name': '',
            'description': '',
            'discounts': [{ 'month': 3, 'rate': 0}, { 'month': 6, 'rate': 10}, { 'month': 12, 'rate': 20}]
          }
        }
      ]
    );
  }
}
