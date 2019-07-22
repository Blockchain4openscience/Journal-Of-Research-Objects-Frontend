import { Component } from '@angular/core';

@Component({
  templateUrl: './github.component.html'
})
export class GithubComponent {

  constructor() { }

  isCollapsed: boolean = false;

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

}

