import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';
import { GithubService } from '../../../services/github/github.service';
import { RoService } from '../../../services/ro/ro.service';
import { environment } from '../../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './github.component.html',
})
export class GithubComponent implements OnInit {

  public githubRepos: Array<any>;
  public user: Object;
  public searching: boolean = true;
  query = false;
  public githubURL = "https://github.com/login/oauth/authorize?scope=user:email&client_id=" + environment.githubClientId;

  constructor(private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private githubService: GithubService,
    private roService: RoService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.user = this.storageService.read<Object>('user');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let code = params['code'];
      
      if (typeof code !== 'undefined' && localStorage.getItem('githubRepos') === null) {
        this.githubService.auth(code).then(async repos => { // Temporarily removed this.user['id']
            this.githubRepos = repos;
            this.storageService.write('githubRepos', this.githubRepos);
            this.searching = false;
            this.query = false;
        });
      }
      else {
        this.githubRepos = this.storageService.read<Array<any>>('githubRepos');
        this.searching = false;
      }
    });
  }

  claim(researchObject: any) {
    console.log(researchObject);
    // let ro = {
    //   $class: "org.bforos.CreateResearchOJ",
    //   researchObjId: researchObject['html_url'],
    //   typeRO: "CODE",
    //   uri: researchObject['uri'],
    //   creator: `resource:org.bforos.Researcher#${this.user['researcherId']}`  
    // }
    let IPFShash = "SAMPLE-INVALID-IPFSHASH";

    // Add ipfs logic here
    let data = {
      "zip_url": researchObject['html_url'] + "/zipball/master/",
      "reponame": researchObject['name']
    }

    let addrepo_headers = new HttpHeaders({'oricid': this.user['researcherId']});

    this.http.post(environment.jroBackendUrl + "/api/github/addrepo/", data, { headers: addrepo_headers }).toPromise()
      .then(async (ipfsresult) => {
        IPFShash = ipfsresult['hash'];
        console.log(IPFShash);
        researchObject['rojId'] = IPFShash;
        researchObject['claimed'] = true;
        this.storageService.write('githubRepos', this.githubRepos);
      }).catch(error => {
        console.log("Adding to IPFS failed");
        IPFShash = "SAMPLE-INVALID-IPFSHASH"
      })
  }

  enrich(researchObject: any) {
    if(researchObject['rojId']!=undefined){
      this.router.navigateByUrl('/enrich/all?rojId='+researchObject['rojId']);  
    }
    else{
      this.router.navigateByUrl('/enrich/all');  
    }
  }

  collapsed(event: any): void {
    // console.log("collapsed");
  }

  expanded(event: any): void {
    // console.log("expanded");
  }

  toggle(researchObject: any) {
    // console.log("toggle");
    researchObject["isCollapsed"] = !researchObject["isCollapsed"];
    this.storageService.write('githubRepos', this.githubRepos);
  }

  
}
