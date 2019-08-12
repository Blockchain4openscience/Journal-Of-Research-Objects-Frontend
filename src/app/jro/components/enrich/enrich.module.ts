// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Collapse Module
import { CollapseModule } from 'ngx-bootstrap/collapse';

// Dropdowns Module
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Routing Module
import { EnrichRoutingModule } from './enrich-routing.module';

// All Component
import { AllComponent } from './all/all.component';

@NgModule({
  declarations: [
    AllComponent,
  ],
  imports: [
    CommonModule,
    EnrichRoutingModule,
    FormsModule,
    CollapseModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [
    AllComponent,
  ]
})
export class EnrichModule { }
