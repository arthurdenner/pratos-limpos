import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePasswordModalPage } from './change-password-modal';

@NgModule({
  declarations: [
    ChangePasswordModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePasswordModalPage),
  ],
})
export class ChangePasswordModalPageModule {}
