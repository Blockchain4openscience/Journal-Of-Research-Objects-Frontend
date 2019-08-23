import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../../jro/services/auth/auth.service';
import { StorageService } from '../../../../jro/services/storage/storage.service'; 
import { ResearcherService } from '../../../../jro/services/researcher/researcher.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  providers: [AuthService, StorageService, ResearcherService]

})
export class LoginComponent implements OnInit {
  user: Object;

  constructor(
   		public router: Router,
    	private activatedRoute: ActivatedRoute,
	  	private location: Location,
	  	private authService: AuthService,
	  	private storageService: StorageService
  ){ }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
			let code = params['code'];
			if (typeof code !== 'undefined' && localStorage.getItem('isLoggedin') === null) {
				let user = this.authService.auth(code).then(user => {
					console.log(user)
					this.user = user;
					this.storageService.write('user', this.user);
					this.storageService.write('isLoggedin', 'true');
					this.router.navigateByUrl('/dashboard');
				});
			}
			else if(localStorage.getItem('isLoggedin')){
				this.router.navigateByUrl('/dashboard');
			}
		});

  }

  onLoggedin() {
		var oauthWindow = window.open(`https://sandbox.orcid.org/oauth/authorize?client_id=${environment.orcidClientId}&response_type=code&scope=/authenticate&redirect_uri=${window.location.href}`, "_self", "toolbar=no, scrollbars=yes, width=500, height=600, top=500, left=500");
	}
}
