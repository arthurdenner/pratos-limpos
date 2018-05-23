import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import isEmpty from 'lodash/fp/isEmpty';
import pick from 'lodash/fp/pick';
import { TabsService } from '../../services/tabs';
import { HomePage } from '../home/home';
import { APP_KEY } from '../../app/constants';

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
    public storage: Storage,
    private tabs: TabsService
  ) {}

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
            alert(err.message);
          });
      })
      .catch(err => {
        alert(err.message);
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
            this.tabs.show();
            this.navCtrl.setRoot(HomePage);
          })
          .catch(err => {
            alert(err.message);
          });
      })
      .catch(err => {
        alert(err.message);
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
              this.tabs.show();
              this.navCtrl.setRoot(HomePage);
            })
            .catch(err => {
              alert(err.message);
            });
        });
      })
      .catch(err => {
        alert(err.message);
      });
  }
}
