import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import map from 'lodash/map';
import { LABELS } from '../../app/constants';

@IonicPage()
@Component({
  selector: 'page-evaluation-modal',
  templateUrl: 'evaluation-modal.html',
})
export class EvaluationModalPage {
  public evaluation: object = null;

  constructor(public view: ViewController, public navParams: NavParams) {
    this.evaluation = this.formatEvaluation(this.navParams.get('evaluation'));
  }

  formatEvaluation(evaluation) {
    return map(evaluation, (value, key) => ({
      question: LABELS[key],
      answer: LABELS[value],
    })).reverse();
  }

  closeEvaluation() {
    this.view.dismiss();
  }
}
