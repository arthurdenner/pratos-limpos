import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  AlertController,
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import isEmpty from 'lodash/fp/isEmpty';
import { TabsService } from '../../services/tabs';
import { HomePage } from '../home/home';
import { RecoverPasswordModalPage } from '../recover-password-modal/recover-password-modal';
import { SignUpPage } from '../sign-up/sign-up';
import { APP_KEY, getMessage } from '../../app/constants';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private user: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public storage: Storage,
    private tabs: TabsService,
    private formBuilder: FormBuilder,
  ) {
    this.user = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  ionViewDidLoad() {
    this.tabs.hide();

    this.storage
      .get(APP_KEY)
      .then(storageData => {
        if (!isEmpty(storageData)) {
          this.tabs.show();
          this.navCtrl.setRoot(HomePage);
        }
      })
    .catch(err => {
      const errorMessage = getMessage('localStorage');

      this.alertCtrl.create({
        subTitle: errorMessage,
        buttons: ['OK'],
      }).present();
    });
  }

  toToSignUp() {
    this.navCtrl.setRoot(SignUpPage);
  }

  login() {
    const { email, password } = this.user.value;

    const loading = this.loadingCtrl.create({
      content: 'Entrando...',
      dismissOnPageChange: true,
    })

    loading.present();

    this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        const userRef = this.db.object(`users/${user.uid}`);

        userRef.valueChanges().subscribe(userObj => {
          this.storage
            .set(APP_KEY, userObj)
            .then(() => {
              this.tabs.show();
              this.navCtrl.setRoot(HomePage);
            })
            .catch(err => {
              const errorMessage = getMessage(err.message);

              this.alertCtrl.create({
                subTitle: errorMessage,
                buttons: ['OK'],
              }).present();
            });
        });
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

  recoverPassword() {
    const { email } = this.user.value;

    this.modalCtrl.create(RecoverPasswordModalPage, { email }).present();
  }
}
