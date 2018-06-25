import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { APP_KEY, API_URL, getMessage } from '../../app/constants';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public loggedUser = {
    idSchool: '',
    uid: ''
  };

  constructor(
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {}

  ionViewDidLoad() {
    const loading = this.loadingCtrl.create({
      content: 'Buscando suas informações...',
      dismissOnPageChange: true,
    })

    loading.present();

    this.storage
      .get(APP_KEY)
      .then(storageData => {
        const userSchoolRef = this.db.object(`schools/${storageData.idSchool}`);

        userSchoolRef.valueChanges().subscribe(school => {
          this.loggedUser = {
            ...storageData,
            school,
          };
        });

        loading.dismiss();
      })
      .catch(err => {
        const errorMessage = getMessage('localStorage');

        loading.dismiss();

        this.alertCtrl.create({
          subTitle: errorMessage,
          buttons: ['OK'],
        }).present();
      });
  }

  searchSchools(event: { component: SelectSearchableComponent; text: string }) {
    const text = (event.text || '').trim().toLowerCase();

    if (!text) {
      event.component.items = [];
      return;
    } else if (event.text.length < 3) {
      return;
    }

    event.component._isSearching = true;

    this.http
      .get(`${API_URL}/search-schools/?name=${text}`)
      .subscribe((response: Response) => {
        event.component.items = response.json();
        event.component._isSearching = false;
      });
  }

  updateUserSchool({ value }) {
    this.loggedUser.idSchool = value._id;
    this.storage.set(APP_KEY, this.loggedUser);
    this.db.object(`users/${this.loggedUser.uid}/idSchool`).set(value._id);
  }

  signOut() {
    this.firebaseAuth.auth.signOut().then(() => {
      this.storage
        .set(APP_KEY, {})
        .then(() => this.navCtrl.setRoot(LoginPage))
        .catch(err => {
          const errorMessage = getMessage('signOut');

          this.alertCtrl.create({
            subTitle: errorMessage,
            buttons: ['OK'],
          }).present();
        });
    });
  }
}
