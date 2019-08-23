import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  rojId: string = 'hello';
  isIdPrefilled: boolean = false;

  constructor(private storageService: StorageService,
    private githubService: GithubService,
    private roService: RoService,
    private http: HttpClient,
    public router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = this.storageService.read<Object>('user');
    this.isSubmitDisabled = false;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if(params['rojId']!=undefined){
        this.rojId = params['rojId'];
        this.isIdPrefilled = true;
      }
    })
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
    this.http.post(environment.composerUrl+"/api/Enrich", JSON.stringify(data), { headers: this.headers }).toPromise()
      .then(async (enrichResult) => {
        this.isSubmitDisabled = true;
      })
      .catch(error => { console.log("Enriching transaction failed while calling composer api"); });
  }

}
