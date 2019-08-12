// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Forms Component
import { FormsComponent } from './forms.component';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsRoutingModule } from './forms-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormsRoutingModule,
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    FormsComponent,
  ],
  exports: [
    FormsComponent
  ]
})
export class FormsCustomModule { }
