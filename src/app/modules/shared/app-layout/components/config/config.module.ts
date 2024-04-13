import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgprimeModule } from '../../../ngprime/ngprime.module';
import { AppConfigComponent } from './app.config.component';



@NgModule({
  declarations: [
    AppConfigComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgprimeModule,
  ],
  exports: [
    AppConfigComponent
  ]
})
export class AppConfigModule { }
