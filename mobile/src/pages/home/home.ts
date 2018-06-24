import { Component } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import isEmpty from 'lodash/fp/isEmpty';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt';
import { LoginPage } from '../login/login';
import { EvaluationPage } from '../evaluation/evaluation';
import { EvaluationModalPage } from '../evaluation-modal/evaluation-modal';
import { APP_KEY, getMessage } from '../../app/constants';

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
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private navParams: NavParams,
    public storage: Storage
  ) { }

  ionViewDidLoad() {
    const loading = this.loadingCtrl.create({
      content: 'Carregando avaliação...',
      dismissOnPageChange: true,
    });

    if (!this.navParams.get('skipFetchEvaluation')) {
      loading.present();
    }

    this.storage
      .get(APP_KEY)
      .then(storageData => {
        if (isEmpty(storageData)) {
          this.navCtrl.setRoot(LoginPage);
          return;
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
            loading.dismiss();

            if (!todayEvaluation) {
              return;
            }

            this.todayEvaluation = todayEvaluation.evaluation;
            this.evaluatedToday = true;
          });
      })
      .catch(err => {
        const errorMessage = getMessage('localStorage');

        loading.dismiss();

        this.alertCtrl.create({
          subTitle: errorMessage,
          buttons: ['OK'],
        }).present();
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
