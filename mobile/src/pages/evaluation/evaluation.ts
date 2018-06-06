import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsService } from '../../services/tabs';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt';

@IonicPage()
@Component({
  selector: 'page-evaluation',
  templateUrl: 'evaluation.html',
})
export class EvaluationPage {
  public currentDate = format(new Date(), 'DD [de] MMMM [de] YYYY', {
    locale: pt,
  });
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
}
