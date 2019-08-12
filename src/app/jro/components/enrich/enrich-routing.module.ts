import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './all/all.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Enrich'
    },
    children: [
      {
        path: '',
        redirectTo: 'all'
      },
      {
        path: 'all',
        component: AllComponent,
        data: {
          title: 'Enrich all Research Objects'
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrichRoutingModule { }
