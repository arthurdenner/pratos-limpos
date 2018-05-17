import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import isEmpty from 'lodash/fp/isEmpty';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  public hasAvaliacoes = false;
  public avaliacoes = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('TODO: Buscar avaliações anteriores');

    this.hasAvaliacoes = !isEmpty(this.avaliacoes);
  }
}
