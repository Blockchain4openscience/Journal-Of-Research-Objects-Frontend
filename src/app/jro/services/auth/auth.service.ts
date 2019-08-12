import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ResearcherService } from '../researcher/researcher.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Object;
	private researcher;

	constructor(private http: HttpClient,
				private researcherService: ResearcherService) { }

  async auth(code: string): Promise<Object> {
		const url = environment.orcidUrl;
		let headers = new HttpHeaders({ 'Accept': 'application/json' });
		let data = new HttpParams()
										.set('client_id', environment.orcidClientId)
										.set('client_secret', environment.orcidClientSecret)
										.set('grant_type', 'authorization_code')
										.set('code', code)
										.set('redirect_uri', 'http://localhost:4200/login');
		return this.http.post(url, data, { headers: headers })
			.toPromise()
			.then(response => {
        this.user = response as Object;
				console.log(this.user);
				return this.researcherService.find(this.user['orcid'])
					.then(result => result)
					.catch(() => {
						let fullName: string;
						fullName = this.user['name'];
						this.researcher = {
							"$class": "org.jro.Researcher",
							researcherId: this.user['orcid'],
							email: 'example@gmail.com',
							name: fullName,
							wallet: 10,
							institution: {
								"$class": "org.jro.afiliation",
								name: "nameofinstitution",
								address: "addressofinstitution",
								Iurl: "instituteurl.com"
							},
							correspAuth: true,
						};
						console.log(this.researcher)
						return this.researcherService.add(this.researcher)
							.then(result => result)
							.catch(this.handleError);
					});
			})
			.catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
  

}
