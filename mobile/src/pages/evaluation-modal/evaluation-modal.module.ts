import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvaluationModalPage } from './evaluation-modal';

@NgModule({
  declarations: [
    EvaluationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EvaluationModalPage),
  ],
})
export class EvaluationModalPageModule {}
