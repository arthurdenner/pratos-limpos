import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavParams,
  ViewController,
} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { getMessage } from '../../app/constants';

@IonicPage()
@Component({
  selector: 'page-recover-password-modal',
  templateUrl: 'recover-password-modal.html',
})
export class RecoverPasswordModalPage {
  public email: string = '';

  constructor(
    private alertCtrl: AlertController,
    private firebaseAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private navParams: NavParams,
    private view: ViewController,
  ) {
    this.email = this.navParams.get('email');
  }

  closeModal() {
    this.view.dismiss();
  }

  requestResetPassword() {
    if (this.email.length > 0) {
      const loading = this.loadingCtrl.create({
        content: 'Enviando e-mail...',
      });

      loading.present();

      this.firebaseAuth.auth.sendPasswordResetEmail(this.email)
        .then(() => {
          this.alertCtrl.create({
            subTitle: 'E-mail enviado com sucesso',
            buttons: [{
              text: 'OK',
              handler: () => {
                loading.dismiss();
                this.closeModal();
              },
            }],
          }).present();
        })
        .catch(err => {
          const errorMessage = getMessage(err.message);

          loading.dismiss();

          this.alertCtrl.create({
            subTitle: errorMessage,
            buttons: ['OK'],
          }).present();
        });
    }
  }
}
