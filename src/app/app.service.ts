import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private readonly BASE_URL = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin';

    constructor(private readonly http: HttpClient) { }

    getData(params: string): Observable<any> {
        const url = this.getUrl(this.BASE_URL, params);
        return this.http.get(url, { headers: new HttpHeaders({ 'accept': 'application/json' }) });
    }

    getUrl(api, params) {
        return `${api}${params}`;
    }
}