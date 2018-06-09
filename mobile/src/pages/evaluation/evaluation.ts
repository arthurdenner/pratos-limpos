import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsService } from '../../services/tabs';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private tabs: TabsService
  ) {}

  ionViewDidLoad() {
    this.tabs.hide();
  }

  ionViewWillLeave() {
    this.tabs.show();
  }

  logForm() {
    console.log(this.evaluation);
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
