import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { StorageService } from '../../../services/storage/storage.service';
import { GithubService } from '../../../services/github/github.service';
import { RoService } from '../../../services/ro/ro.service';

@Component({
  templateUrl: './all.component.html',
})
export class AllComponent implements OnInit {
  public user: Object;

  constructor(private storageService: StorageService,
    private githubService: GithubService,
    private roService: RoService,
    private http: HttpClient) { }

  ngOnInit() {
    this.user = this.storageService.read<Object>('user');
    this.isSubmitDisabled = false;
  }


  isSubmitDisabled: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  onSubmit(form: NgForm) {
    let data = form.value;
    data["creator"] = "resource:org.jro.Researcher#" + this.user['researcherId'];
    data["$class"] = "org.jro.Enrich";
    console.log('value', form.value);
    console.log(JSON.stringify(data));
    this.http.post("http://localhost:5002/api/Enrich", data).toPromise()
      .then(async (enrichResult) => {
        this.isSubmitDisabled = true;
      })
      .catch(error => { console.log("Enriching transaction failed while calling composer api") });
  }

}
