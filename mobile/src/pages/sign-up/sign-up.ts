import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import isEmpty from 'lodash/fp/isEmpty';
import pick from 'lodash/fp/pick';
import { TabsService } from '../../services/tabs';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { APP_KEY } from '../../app/constants';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  private user: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public storage: Storage,
    private tabs: TabsService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.formBuilder.group({
      name: ['', Validators.required],
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
      .catch(err => alert('An error occured reading from the storage!'));
  }

  toToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  login(email, password) {
    this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.tabs.show();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(err => alert(err.message));
  }

  signup() {
    const { email, name, password } = this.user.value;

    this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        const userRef = this.db.object(`users/${user.uid}`);
        const userData = {
          ...pick(['email', 'uid'], user),
          name,
        };

        userRef
          .update(userData)
          .then(() => this.login(email, password))
          .catch(err => alert(err.message));
      })
      .catch(err => alert(err.message));
  }
}
