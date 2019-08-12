// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Collapse Module
import { CollapseModule } from 'ngx-bootstrap/collapse';

// Dropdowns Module
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Github Component
import { GithubComponent } from './github/github.component';

// Upload Component
import { UploadComponent } from './upload/upload.component';

// Components Routing
import { AddRoutingModule } from './add-routing.module';


@NgModule({
  declarations: [
    GithubComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    AddRoutingModule,
    FormsModule,
    CollapseModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [
    GithubComponent,
    UploadComponent,
  ]
})
export class AddModule { }
