import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class RoService {
	private headers = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
	private roUrl = `${environment.serviceUrl}/api/ROJ`;  // URL to web api
	private claimUrl = `${environment.serviceUrl}/api/Add`;
	//private createUrl = `${environment.serviceUrl}/api/Add`;
	//private mineClaimedUrl = `${environment.serviceUrl}/api/queries/selectResearchObjectsByClaimerId?researcherId=`
	//private mineCollectUrl = `${environment.serviceUrl}/api/queries/selectResearchObjByCollectorId?researcherId=`
	private mineClaimedRO: Object[] = [];
	private mineCollectRO: Object[] = [];

	constructor(private http: HttpClient) { }

	// create(ro: Object){
	// 	return this.http.post(this.createUrl, ro, { headers: this.headers }).
	// 	toPromise()
	// 	.then(response => response as Object)
	// 	.catch(this.handleError);
	// }


	claim(orcid: string, ipfshash: string, githubUrl: string): Promise<Object> { // Add object to blockchain after adding to ipfs
		let headers = new Headers({
			'Content-Type': 'application/json'
		});
		let claim = {
			"$class": "org.jro.Add",
			rojId: ipfshash,
			node: githubUrl,
			creator: "resource:org.jro.Researcher#" + orcid
		}
		return this.http.post(this.claimUrl, claim, { headers: this.headers })
			.toPromise()
			.then(response => response as Object)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
