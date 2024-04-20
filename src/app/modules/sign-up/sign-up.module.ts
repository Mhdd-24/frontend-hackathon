import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgprimeModule } from '../shared/ngprime/ngprime.module';
import { DirectivesModule } from '../shared/directives/directives.module';


@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    ReactiveFormsModule,
    NgprimeModule,
    FormsModule,
    DirectivesModule
  ]
})
export class SignUpModule { }
