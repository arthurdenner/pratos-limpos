import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import isEmpty from 'lodash/fp/isEmpty';
import { TabsService } from '../../services/tabs';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { APP_KEY, API_URL } from '../../app/constants';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  private user: FormGroup;

  constructor(
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public storage: Storage,
    private tabs: TabsService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.formBuilder.group({
      idSchool: ['', Validators.required],
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

  login(email: string, name: string, password: string) {
    this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        const userData = { uid: user.uid, email, name };

        this.storage
          .set(APP_KEY, userData)
          .then(() => {
            this.tabs.show();
            this.navCtrl.setRoot(HomePage);
          })
          .catch(err => alert(err.message));
      })
      .catch(err => alert(err.message));
  }

  signup() {
    const { email, idSchool, name, password } = this.user.value;

    // TODO: Save in the user's reference
    console.log(idSchool);

    this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        const userRef = this.db.object(`users/${user.uid}`);
        const userData = { uid: user.uid, email, name };

        userRef
          .update(userData)
          .then(() => this.login(email, name, password))
          .catch(err => alert(err.message));
      })
      .catch(err => alert(err.message));
  }

  searchSchools(event: { component: SelectSearchableComponent; text: string }) {
    const text = (event.text || '').trim().toLowerCase();

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
        event.component.items = response.json();
        event.component.isSearching = false;
      });
  }
}
