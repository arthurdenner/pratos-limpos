import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import isEmpty from 'lodash/fp/isEmpty';
import pick from 'lodash/fp/pick';
import { HomePage } from '../home/home';

const APP_KEY = '--pratos--limpos';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email: string = 'arthurdenner7@gmail.com';
  public password: string = '123456';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public storage: Storage
  ) {}

  ionViewDidLoad() {
    this.storage
      .get(APP_KEY)
      .then(storageData => {
        if (!isEmpty(storageData)) {
          this.navCtrl.setRoot(HomePage);
        }
      })
      .catch(err => {
        console.error(err);
        alert('An error occured reading from the storage!');
      });
  }

  signup() {
    this.firebaseAuth.auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        const userRef = this.db.object(`users/${user.uid}`);
        const userData = pick(['displayName', 'email', 'uid'], user);

        userRef
          .update(userData)
          .then(() => {
            console.log('Signed up successfully!');
            this.login();
          })
          .catch(err => {
            console.error(err);
            alert('An error occured trying to signup!');
          });
      })
      .catch(err => {
        console.error(err);
        alert('An error occured!');
      });
  }

  login() {
    this.firebaseAuth.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        const userData = pick(['displayName', 'email', 'uid'], user);

        this.storage
          .set(APP_KEY, userData)
          .then(() => {
            console.log('Logged in successfully!');
            this.navCtrl.setRoot(HomePage);
          })
          .catch(err => {
            console.error(err);
            alert('An error occured trying to login!');
          });
      })
      .catch(err => {
        console.error(err);
        alert('An error occured!');
      });
  }

  loginWithGoogle() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    this.firebaseAuth.auth
      .signInWithRedirect(googleProvider)
      .then(user => {
        const userRef = this.db.object(`users/${user.uid}`);

        userRef.valueChanges().subscribe(value => {
          const userData = pick(['displayName', 'email', 'uid'], user);
          if (!value) {
            userRef.update(userData).catch(err => {
              console.error(err);
              alert('An error occured trying to signup with Google!');
            });
          }

          this.storage
            .set(APP_KEY, userData)
            .then(() => {
              console.log('Logged in successfully!');
              this.navCtrl.setRoot(HomePage);
            })
            .catch(err => {
              console.error(err);
              alert('An error occured trying to login with Google!');
            });
        });
      })
      .catch(err => {
        console.error(err);
        alert('An error occured!');
      });
  }
}
