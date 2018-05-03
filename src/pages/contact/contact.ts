import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import get from 'lodash/fp/get';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  public userId: string;

  constructor(
    public navCtrl: NavController,
    public firebaseAuth: AngularFireAuth
  ) {
    this.userId = get('auth.currentUser.uid', this.firebaseAuth);
  }

  signout() {
    this.firebaseAuth.auth
      .signOut()
      .then(() => {
        console.log('Logged out successfully!');
        console.log('Go to LoginPage');
      })
      .catch(err => {
        console.error(err);
        alert('An error occured!');
      });
  }
}
