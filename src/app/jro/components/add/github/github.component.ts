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
    private http: HttpClient) { }

  ngOnInit() {
    this.user = this.storageService.read<Object>('user');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let code = params['code'];
      console.log(code);
      if (typeof code !== 'undefined' && localStorage.getItem('githubRepos') === null) {
        console.log('here');
        this.githubService.auth(code).then(async repos => { // Temporarily removed this.user['id']
          console.log(code);
          this.githubRepos = repos;
          this.storageService.write('githubRepos', this.githubRepos);
          console.log("Just Navigating");
          //this.router.navigateByUrl('/base/github');
          this.searching = false;
          this.query = false;
        });
        //this.githubService.auth(code, this.user['orcid']).then(result => {console.log(result)})
      }
      else {
        this.githubRepos = this.storageService.read<Array<any>>('githubRepos');
        this.searching = false;
        // console.log(this.githubRepos);
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
    let IPFShash = "23123132132123@@#";
    // Add ipfs logic here
    let data = {
      "githuburl": researchObject['html_url'] + ".git",
      "reponame": researchObject['name']
    }

    this.http.post("http://127.0.0.1:8000/api/ipfs/", data).toPromise()
      .then(async (ipfsresult) => {
        IPFShash = ipfsresult['hash'];
        console.log("INSIDE POST");
        console.log(IPFShash);
        this.roService.claim(this.user['researcherId'], IPFShash, researchObject['html_url'])
          .then(claimResult => {
            researchObject['claimed'] = true;
            this.storageService.write('githubRepos', this.githubRepos);
          })
          .catch(error => { console.log("Adding ROJ to blockchain failed.") });

      }
      )
      .catch(error => {
        console.log(error);
        console.log("IPFS failed");
        IPFShash = "23123132132123@@#"
      })


    // this.roService.claim(this.user['researcherId'],IPFShash,researchObject['html_url'])
    //         .then(claimResult => {
    //           researchObject['claimed'] = true;
    //           this.storageService.write('githubRepos', this.githubRepos);
    //         })
    //         .catch(error => {console.log("Adding ROJ to blockchain failed.")});      
    // this.roService.exists(researchObject['researchObjId'])
    // .then(data => {
    //     console.log(data);
    //     if(!data){
    //       this.roService.create(ro)
    //         .then(result => {
    //           researchObject['claimed'] = true;
    //           this.storageService.write('githubRepos', this.githubRepos);
    //         });
    //     }
    //     else {
    //       this.roService.claim(this.user['researcherId'], researchObject['researchObjId'])
    //         .then(claimResult => {
    //           researchObject['claimed'] = true;
    //           this.storageService.write('githubRepos', this.githubRepos);
    //         });
    //     }       
    // })
    //   .catch(error => {console.log("error read if file exists")});      
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
