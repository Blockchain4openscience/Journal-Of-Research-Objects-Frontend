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

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log("Hello");
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      console.log("File got")
      // console.log(event.target.files);
      const file = event.target.files[0];
      console.log(file);
      let headers = new HttpHeaders({ 'Content-Disposition': 'attachment; filename=install.sh' });

      this.http.post("http://172.17.62.244:8000/api/ipfs/addfile/", file, { headers: headers } ).toPromise()
          .then(async (ipfsresult)=> {
            console.log(ipfsresult);
            // TODO: Put a redirect over here
          }
          )
      // data= {
      //   "$class": "org.jro.Add", roj
      // }
      // this.form.get('avatar').setValue(file);
    }
  }

}
