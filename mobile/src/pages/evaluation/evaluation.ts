import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import format from 'date-fns/format';
import { TabsService } from '../../services/tabs';
import { HomePage } from '../home/home';
import { APP_KEY } from '../../app/constants';

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
      .catch(err => alert('An error occured reading from the storage!'));
  }

  ionViewWillLeave() {
    this.tabs.show();
  }

  saveEvaluation() {
    const today = format(new Date(), 'YYYY-MM-DD');
    const evaluationsRef = this.db.list('/evaluations');

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
          alert('Avaliação enviada com sucesso! Obrigado!');
          this.navCtrl.setRoot(HomePage);
        },
        err => alert('Houve um erro na hora de salvar a avaliação.')
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
