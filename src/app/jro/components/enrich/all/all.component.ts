import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { StorageService } from '../../../services/storage/storage.service';
import { GithubService } from '../../../services/github/github.service';
import { RoService } from '../../../services/ro/ro.service';
import { environment } from '../../../../../environments/environment';

@Component({
  templateUrl: './all.component.html',
})
export class AllComponent implements OnInit {
  public user: Object;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

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
  }

  expanded(event: any): void {
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  onSubmit(form: NgForm) {
    let data = form.value;
    data["rojId"] = "resource:org.jro.ROJ#" + data["rojId"]
    data["creator"] = "resource:org.jro.Researcher#" + this.user['researcherId'];
    data["$class"] = "org.jro.Enrich";
    console.log('value', form.value);
    console.log(JSON.stringify(data));
    this.http.post(environment.composerUrl+"/api/Enrich", JSON.stringify(data), { headers: this.headers }).toPromise()
      .then(async (enrichResult) => {
        this.isSubmitDisabled = true;
      })
      .catch(error => { console.log("Enriching transaction failed while calling composer api") });
  }

}
