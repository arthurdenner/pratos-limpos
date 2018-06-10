import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-evaluation-modal',
  templateUrl: 'evaluation-modal.html',
})
export class EvaluationModalPage {
  public evaluation: object = null;

  constructor(public view: ViewController, public navParams: NavParams) {
    this.evaluation = this.navParams.get('evaluation');
  }

  closeEvaluation() {
    this.view.dismiss();
  }
}
