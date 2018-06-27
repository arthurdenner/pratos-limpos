import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  AlertController,
  IonicPage,
  LoadingController,
  ViewController,
} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { getMessage } from '../../app/constants';

@IonicPage()
@Component({
  selector: 'page-change-password-modal',
  templateUrl: 'change-password-modal.html',
})
export class ChangePasswordModalPage {
  public changePassword: FormGroup;

  constructor(
    private alertCtrl: AlertController,
    private firebaseAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private view: ViewController,
    private formBuilder: FormBuilder,
  ) {
    this.changePassword = this.formBuilder.group({
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)],
        ),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ]),
      ],
    }, {
        validator: this.matchingPasswords('password', 'confirmPassword')
      });
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  closeModal() {
    this.view.dismiss();
  }

  updateUserPassword() {
    const { password } = this.changePassword.value;

    const loading = this.loadingCtrl.create({
      content: 'Salvando nova senha...'
    })

    loading.present()

    this.firebaseAuth.auth.currentUser.updatePassword(password)
      .then(() => {
        loading.dismiss();

        this.alertCtrl.create({
          subTitle: 'Salva alterada com sucesso',
          buttons: [{
            text: 'OK',
            handler: () => {
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
