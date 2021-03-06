import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HistoryPage } from '../pages/history/history';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { EvaluationPage } from '../pages/evaluation/evaluation';
import { EvaluationModalPage } from '../pages/evaluation-modal/evaluation-modal';
import { RecoverPasswordModalPage } from '../pages/recover-password-modal/recover-password-modal';
import { TabsPage } from '../pages/tabs/tabs';
import { TabsService } from '../services/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebaseConfig from './firebase-config';
import { ChangePasswordModalPage } from '../pages/change-password-modal/change-password-modal';

@NgModule({
  declarations: [
    MyApp,
    HistoryPage,
    HomePage,
    LoginPage,
    ProfilePage,
    SignUpPage,
    EvaluationPage,
    EvaluationModalPage,
    ChangePasswordModalPage,
    RecoverPasswordModalPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    SelectSearchableModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HistoryPage,
    HomePage,
    LoginPage,
    ProfilePage,
    SignUpPage,
    EvaluationPage,
    EvaluationModalPage,
    ChangePasswordModalPage,
    RecoverPasswordModalPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth,
    AngularFireDatabase,
    TabsService,
  ],
})
export class AppModule { }
