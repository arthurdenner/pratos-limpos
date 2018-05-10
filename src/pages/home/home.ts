import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
// import { LoginPage } from '../login/login';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt';

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
    public db: AngularFireDatabase
  ) {}
}
