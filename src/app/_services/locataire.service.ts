import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Locataire } from '../_models/locataire.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class LocataireService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all locataire
  * @param data 
  * @returns 
  */
  getLocataire(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('nom', data['nom'] ?? "")
      .set('prenom', data['prenom'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/locataire/list`, queryParams)
  }
  /**
   * create new 
   * @param locataire 
   * @returns 
   */
  saveLocataire(formData : FormData):Observable<Locataire>{
    return this.http.post<Locataire>(`${this.host}/locataire/add`, formData)
  }
/**
 * updated exiting locataire
 * @param locataire 
 * @returns 
 */
  updateLocataire(formData : FormData):Observable<Locataire>{
    return this.http.post<Locataire>(`${this.host}/locataire/update/`, formData)
  }
/**
 * get existing locataire details
 * @param locataire 
 * @returns 
 */
  geteDetails(locataire : Locataire):Observable<Locataire>{
    return this.http.get<Locataire>(`${this.host}/locataire/detail/${locataire.id}`)
  }

  /**
 * simple list
 * @param locataire 
 * @returns 
 */
  getAllLocataire():Observable<Locataire[]>{
    return this.http.get<Locataire[]>(`${this.host}/locataire/simple-list`)
  }

  public createLocataireFormdData(locataire: Locataire, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('id',JSON.stringify(locataire.id));
    formData.append('nomLocataire', locataire.nomLocataire);
    formData.append('prenomLocataire', locataire.prenomLocataire);
    formData.append('contact1', locataire.contact1);
    formData.append('contact2', locataire.contact2);
    formData.append('emailLocataire', locataire.emailLocataire);
    formData.append('numeroPieceLocataire', locataire.numeroPieceLocataire);
    formData.append('civiliteLocataire', locataire.civiliteLocataire);
    formData.append('infoLocataire', locataire.infoLocataire);
    formData.append('activiteLocataire', locataire.activiteLocataire);
    formData.append('pieceIdentiteUrl', profileImage);
    return formData
  }

}
