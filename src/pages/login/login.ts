import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import pick from 'lodash/fp/pick';
import { HomePage } from '../home/home';

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
  public email: string;
  public password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {}

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
            alert('An error occured!');
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
      .then(() => {
        console.log('Logged in successfully!');
        this.navCtrl.setRoot(HomePage);
      })
      .catch(err => {
        console.error(err);
        alert('An error occured!');
      });
  }
}
