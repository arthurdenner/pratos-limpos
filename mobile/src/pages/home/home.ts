import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import isEmpty from 'lodash/fp/isEmpty';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt';
import { LoginPage } from '../login/login';
import { EvaluationPage } from '../evaluation/evaluation';
import { EvaluationModalPage } from '../evaluation-modal/evaluation-modal';
import { APP_KEY } from '../../app/constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public currentDate = format(new Date(), 'dddd, DD/MM/YYYY', {
    locale: pt,
  });
  public evaluatedToday: boolean = false;
  public todayEvaluation: any = null;

  constructor(
    private db: AngularFireDatabase,
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    public storage: Storage
  ) {}

  ionViewDidLoad() {
    this.storage
      .get(APP_KEY)
      .then(storageData => {
        if (isEmpty(storageData)) {
          this.navCtrl.setRoot(LoginPage);
        }

        const today = format(new Date(), 'YYYY-MM-DD');

        this.db
          .list('/evaluations', ref =>
            ref
              .orderByChild('idUser_date')
              .equalTo(`${storageData.uid}_${today}`)
          )
          .valueChanges()
          .subscribe(([todayEvaluation]: any) => {
            if (!todayEvaluation) {
              return;
            }

            this.todayEvaluation = todayEvaluation.evaluation;
            this.evaluatedToday = true;
          });
      })
      .catch(err => {
        console.error(err);
        alert('An error occured reading from the storage!');
      });
  }

  makeEvaluation() {
    this.navCtrl.push(EvaluationPage);
  }

  showEvaluation() {
    const modalData = {
      evaluation: this.todayEvaluation,
    };

    const evaluationModal = this.modalCtrl.create(
      EvaluationModalPage,
      modalData
    );

    evaluationModal.present();
  }
}
