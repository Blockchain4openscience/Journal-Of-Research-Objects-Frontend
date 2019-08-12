import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubComponent } from './github/github.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Add'
    },
    children: [
      {
        path: '',
        redirectTo: 'upload'
      },
      {
        path: 'github',
        component: GithubComponent,
        data: {
          title: 'Github'
        }
      },
      {
        path: 'upload',
        component: UploadComponent,
        data: {
          title: 'Upload'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoutingModule { }
