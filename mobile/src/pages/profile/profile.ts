import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { APP_KEY, API_URL } from '../../app/constants';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public loggedUser = {};
  public schools: any = [];

  constructor(
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {}

  ionViewDidLoad() {
    this.storage
      .get(APP_KEY)
      .then(storageData => {
        const userSchoolRef = this.db.object(`schools/${storageData.idSchool}`);

        userSchoolRef.valueChanges().subscribe(school => {
          this.schools = [school];
          this.loggedUser = {
            ...storageData,
            school,
          };
        });
      })
      .catch(err => alert('An error occured reading from the storage!'));
  }

  searchSchools(event: { component: SelectSearchableComponent; text: string }) {
    const text = (event.text || '').trim().toLowerCase();
    console.log('text', text);

    if (!text) {
      event.component.items = [];
      return;
    } else if (event.text.length < 3) {
      return;
    }

    event.component.isSearching = true;

    this.http
      .get(`${API_URL}/search-schools/?name=${text}`)
      .subscribe((response: Response) => {
        console.log(response.json())
        this.schools = [];
        event.component.items = response.json();
        event.component.isSearching = false;
      });
  }

  signOut() {
    this.firebaseAuth.auth.signOut().then(() => {
      this.storage
        .set(APP_KEY, {})
        .then(() => this.navCtrl.setRoot(LoginPage))
        .catch(err => alert('An error occured trying to sign out!'));
    });
  }
}
