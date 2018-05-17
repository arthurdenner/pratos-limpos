import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import isEmpty from 'lodash/fp/isEmpty';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt';
import { LoginPage } from '../login/login';
import { APP_KEY } from '../../app/constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public currentDate = format(new Date(), 'dddd, DD [de] MMMM [de] YYYY', {
    locale: pt,
  });

  constructor(public navCtrl: NavController, public storage: Storage) {}

  ionViewDidLoad() {
    this.storage
      .get(APP_KEY)
      .then(storageData => {
        if (isEmpty(storageData)) {
          this.navCtrl.setRoot(LoginPage);
        }
      })
      .catch(err => {
        console.error(err);
        alert('An error occured reading from the storage!');
      });

    console.log('TODO: Buscar avaliação do dia!');
  }

  makeEvaluation() {
    alert('Realizar avaliação');
  }
}
