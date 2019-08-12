import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private repositories: any[] = [];
	private user: Object;

	constructor(private http: HttpClient,
		//private roService: ROService,
		private storageService: StorageService) { }

	auth(code: string): Promise<any[]> { // Temporarily removed orcid: string
		const url = `${environment.githubApi}`;
		let headers = new HttpHeaders({ 'Accept': 'application/json' });
		 // Website you wish to allow to connect
		headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
		headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		headers.append('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
		headers.append('Access-Control-Allow-Credentials', 'true');
		let body = new HttpParams();
		this.user = this.storageService.read<Object>('user');
		body = body.set('client_id', environment.githubClientId);
		body = body.set('client_secret', environment.githubClientSecret);
		body = body.set('code', code);
		console.log("call oauth");
		return this.http.post(url, body, { headers: headers }).toPromise()
			.then(async (result) => {
				return this.http.get(`${environment.githubUserApi}?access_token=${result['access_token']}`).toPromise()
					.then(gitUser => {
						return this.http.get<any[]>(gitUser['repos_url']).toPromise()
							.then(async (repos) => {
								
								for (let i = 0; i < repos.length; i++) {
									console.log("In the for loop");
									console.log(repos[i]);
									//let exist = await this.roService.exists(repos[i]['html_url']);
									//console.log(exist);
									// if (!exist) {
										// let repository = repos[i];
										// repository['$class'] =  "org.bforos.ResearchOJ",
										// repository['researchObjId'] = repos[i]['html_url'],
										// repository['typero'] = 'CODE',
										// repository['uri'] = repos[i]['html_url'],
										// repository['owner'] = orcid
										// repository['name'] = repos[i]['name'];
										// repository['claimed'] = false;
										// repository['language'] = repos[i]['language'];
										// repository['description'] = repos[i]['description'];
										this.repositories.push(repos[i]);
									// 	/*
									// 	let ro = {
									// 		$class: "org.bforos.ResearchOJ",
									// 		ROId: repos[i]['html_url'],
									// 		typero: 'CODE',
									// 		uri: repos[i]['html_url'],
									// 		creation: new Date(),
									// 		owner: orcid
									// 	}
									// 	this.roService.add(ro)
									// 		.then(data => {
									// 			let repository = data;
									// 			repository['name'] = repos[i]['name'];
									// 			repository['claimed'] = false;
									// 			repository['language'] = repos[i]['language'];
									// 			repository['description'] = repos[i]['description'];
									// 			this.repositories.push(repository);
									// 		})
									// 		.catch(error => {
									// 			console.log("Cannot create Research Object ")
									// 		});*/
									// }
									// else {
									// 	this.roService.getSingle(repos[i]['html_url'])
									// 		.then(async data => {
									// 			let repository = data;
									// 			repository['name'] = repos[i]['name'];
									// 			repository['language'] = repos[i]['language'];
									// 			repository['description'] = repos[i]['description'];
									// 			console.log(repository['contributors']);
									// 			if(repository['contributors'] == "resource:org.bforos.Researcher#" + this.user['researcherId']){
									// 				repository['claimed'] = true;
									// 			}
									// 			else {
									// 				repository['claimed'] = false;
									// 			}
									// 			//repository['claimed'] = await this.roService.isClaimed(this.user['researcherId'], repository['researchObjId']);
												
									// 			this.repositories.push(repository);
									// 		})
									// 		.catch(error => {
									// 			console.log("Cannot create Research Object ")
									// 		})
									// }
								}
								return await this.repositories;
							})
							.catch(error => {
								console.log("Don't read repos");
								error.message;
							})
					})
					.catch(this.handleError);
			})
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}


}

