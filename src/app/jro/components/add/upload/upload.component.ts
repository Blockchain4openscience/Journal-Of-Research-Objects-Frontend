import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';
import { GithubService } from '../../../services/github/github.service';
import { RoService } from '../../../services/ro/ro.service';
import { environment } from '../../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  templateUrl: './upload.component.html',
})
export class UploadComponent implements OnInit {
  selectedFile: File = null;
  public user: Object;

  constructor(private http: HttpClient,
    private router: Router,
    private storageService: StorageService) { }

  ngOnInit() {
    this.user = this.storageService.read<Object>('user');
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    let headers = new HttpHeaders({ 'Content-Disposition': 'attachment; filename=install.sh','oricid': this.user['researcherId']});
      
    this.http.post(environment.jroBackendUrl+"/api/ipfs/addfile/", this.selectedFile, { headers: headers } ).toPromise()
        .then(async (ipfsresult)=> {
          console.log(ipfsresult);
          this.router.navigateByUrl('/enrich/all?rojId=' + ipfsresult['hash']);  
        })
        .catch(error => {console.log("Adding file to IPFS failed");});
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

}
