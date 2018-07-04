import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecoverPasswordModalPage } from './recover-password-modal';

@NgModule({
  declarations: [
    RecoverPasswordModalPage,
  ],
  imports: [
    IonicPageModule.forChild(RecoverPasswordModalPage),
  ],
})
export class RecoverPasswordModalPageModule {}
