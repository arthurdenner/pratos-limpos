import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import isEmpty from 'lodash/fp/isEmpty';
import { EvaluationModalPage } from '../evaluation-modal/evaluation-modal';
import { APP_KEY } from '../../app/constants';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  public hasEvaluations = false;
  public evaluations = [];

  constructor(
    private db: AngularFireDatabase,
    private modalCtrl: ModalController,
    private storage: Storage,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.storage
      .get(APP_KEY)
      .then(storageData => {
        this.db
          .list('/evaluations', ref =>
            ref.orderByChild('idUser').equalTo(`${storageData.uid}`)
          )
          .valueChanges()
          .subscribe((evaluations: any) => {
            if (isEmpty(evaluations)) {
              return;
            }

            this.evaluations = evaluations;
            this.hasEvaluations = true;
          });
      })
      .catch(err => {              
        const errorMessage = getErrorMessage('localStorage');

        this.alertCtrl.create({
          subTitle: errorMessage,
          buttons: ['OK'],
        }).present();
      });
  }

  showEvaluation(data) {
    const modalData = {
      evaluation: data.evaluation,
    };

    const evaluationModal = this.modalCtrl.create(
      EvaluationModalPage,
      modalData
    );

    evaluationModal.present();
  }
}
