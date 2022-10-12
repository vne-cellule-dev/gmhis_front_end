import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Resource } from '../_models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private host = environment.apiUrl;

  constructor(private http : HttpClient) { }

/**
 * get resources with their authorities
 * @returns Resource[] 
 */
    findAll():Observable<Resource[]>{
      return this.http.get<Resource[]>(`${this.host}/resource/list`) 
    }
}
