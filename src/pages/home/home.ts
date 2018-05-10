import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
// import { LoginPage } from '../login/login';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt';
import { LoginPage } from '../login/login';

const APP_KEY = '--pratos--limpos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public currentDate = format(new Date(), 'dddd, DD [de] MMMM [de] YYYY', {
    locale: pt,
  });

  constructor(
    public navCtrl: NavController,
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public storage: Storage
  ) {}

  signOut() {
    this.firebaseAuth.auth.signOut().then(() => {
      this.storage
        .set(APP_KEY, {})
        .then(() => {
          console.log('Signed out successfully!');
          this.navCtrl.setRoot(LoginPage);
        })
        .catch(err => {
          console.error(err);
          alert('An error occured trying to login!');
        });
    });
  }
}
