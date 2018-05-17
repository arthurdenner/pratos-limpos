import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { APP_KEY } from '../../app/constants';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public usuario = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public firebaseAuth: AngularFireAuth
  ) {}

  ionViewDidLoad() {
    this.storage
      .get(APP_KEY)
      .then(storageData => {
        this.usuario = storageData;
      })
      .catch(err => {
        console.error(err);
        alert('An error occured reading from the storage!');
      });
  }

  selectSchool() {
    console.log('TODO: Escolher escola!');
  }

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
