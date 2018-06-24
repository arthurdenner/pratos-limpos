import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import format from 'date-fns/format';
import { TabsService } from '../../services/tabs';
import { HomePage } from '../home/home';
import { APP_KEY, getErrorMessage } from '../../app/constants';

@IonicPage()
@Component({
  selector: 'page-evaluation',
  templateUrl: 'evaluation.html',
})
export class EvaluationPage {
  private evaluation = {
    teveMerenda: null,
    porqueNaoTeveMerenda: null,
    recebeuMerenda: null,
    porqueNaoRecebeuMerenda: null,
    quantidadeFoiSuficiente: null,
    qualidadeDaMerendaRecebida: null,
    nivelDeSatisfacao: null,
  };
  private idSchool: string = null;
  private idUser: string = null;

  constructor(
    private db: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private tabs: TabsService
  ) {}

  ionViewDidLoad() {
    this.tabs.hide();

    this.storage
      .get(APP_KEY)
      .then(storageData => {
        this.idSchool = storageData.idSchool;
        this.idUser = storageData.uid;
      })
      .catch(err => {
        const errorMessage = getErrorMessage('localStorage');

        this.alertCtrl.create({
          subTitle: errorMessage,
          buttons: ['OK'],
        }).present();
      });
  }

  ionViewWillLeave() {
    this.tabs.show();
  }

  saveEvaluation() {
    const today = format(new Date(), 'YYYY-MM-DD');
    const evaluationsRef = this.db.list('/evaluations');

    const loading = this.loadingCtrl.create({
      content: 'Salvando avaliação...',
      dismissOnPageChange: true,
    });

    loading.present();

    evaluationsRef
      .push({
        date: today,
        evaluation: this.evaluation,
        idSchool: this.idSchool,
        idUser: this.idUser,
        idUser_date: `${this.idUser}_${today}`,
      })
      .then(
        () => {
          const errorMessage = getErrorMessage('evaluationSuccess');

          this.alertCtrl.create({
            subTitle: errorMessage,
            buttons: [{
              text: 'OK',
              handler: () => {
                this.navCtrl.setRoot(HomePage, {
                  skipFetchEvaluation: true,
                });
              }
            }],
          }).present();

        },
        err => {
          const errorMessage = getErrorMessage('evaluationError');

          loading.dismiss();

          this.alertCtrl.create({
            subTitle: errorMessage,
            buttons: ['OK'],
          }).present();
        }
      );
  }

  onChangeTeveMerenda() {
    this.evaluation.porqueNaoTeveMerenda = null;
    this.evaluation.recebeuMerenda = null;
    this.evaluation.porqueNaoRecebeuMerenda = null;
    this.evaluation.quantidadeFoiSuficiente = null;
    this.evaluation.qualidadeDaMerendaRecebida = null;
    this.evaluation.nivelDeSatisfacao = null;
  }

  onChangeRecebeuMerenda() {
    this.evaluation.porqueNaoRecebeuMerenda = null;
    this.evaluation.quantidadeFoiSuficiente = null;
    this.evaluation.qualidadeDaMerendaRecebida = null;
    this.evaluation.nivelDeSatisfacao = null;
  }

  isSubmitDisabled() {
    const {
      teveMerenda,
      porqueNaoTeveMerenda,
      recebeuMerenda,
      porqueNaoRecebeuMerenda,
      quantidadeFoiSuficiente,
      qualidadeDaMerendaRecebida,
      nivelDeSatisfacao,
    } = this.evaluation;

    if (teveMerenda === null) {
      return true;
    } else if (teveMerenda === 'nao') {
      return porqueNaoTeveMerenda === null;
    }

    if (recebeuMerenda === null) {
      return true;
    } else if (recebeuMerenda === 'nao') {
      return porqueNaoRecebeuMerenda === null;
    }

    return (
      quantidadeFoiSuficiente === null ||
      qualidadeDaMerendaRecebida === null ||
      nivelDeSatisfacao === null
    );
  }
}
