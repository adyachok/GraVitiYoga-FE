import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Training} from './training';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class TrainingService {
  private _trainingsUrl = '../resources/trainings.json'
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
          'isSelected': false,
          'image': '../../assets/img/retreat.jpeg'
        },
        {
          'name': 'Урок GraVitiYoga с персональным инструктором',
          'price': 345,
          'isSelected': false,
          'image': '../../assets/img/yoga_pair.jpeg'
        },
        {
          'name': 'Урок классической йоги (дыхание, равновесие, растяжки)',
          'price': 223,
          'isSelected': false,
          'image': '../../assets/img/yoga_sea.jpeg'
        },
        {
          'name': 'Массаж шведи, спортивный или классический',
          'price': 273,
          'isSelected': false,
          'image': '../../assets/img/massage.jpeg'
        },
        {
          'name': 'Массаж интуитивный',
          'price': 267,
          'isSelected': false,
          'image': '../../assets/img/lotus.jpeg'
        },
        {
          'name': 'Программа индивидуального моделирования тела',
          'price': 543,
          'isSelected': false,
          'image': '../../assets/img/ideal_body_composition_1.jpg'
        },
        {
          'name': 'Реабилитация или коррекция тела (суставы, позвоночник, связки)',
          'price': 1003,
          'isSelected': false,
          'image': '../../assets/img/yoga_pair.jpeg'
        },
        {
          'name': 'Занятия на тренажерах “ПравИло” и “Лебедь”',
          'price': 777,
          'isSelected': false,
          'image': '../../assets/img/flying-yoga.jpeg'
        },
        {
          'name': 'Курс тета-хиллинг',
          'price': 678,
          'isSelected': false,
          'image': '../../assets/img/rehabilitation.jpeg'
        },
        {
          'name': 'Лайф-коучинг сопровождение',
          'price': 480,
          'isSelected': false,
          'image': '../../assets/img/coaching.jpeg'
        },
        {
          'name': 'Консультации по питанию и здоровому образу жизни',
          'price': 113,
          'isSelected': false,
          'image': '../../assets/img/meal.jpeg'
        }
      ]
    );
  }
}
