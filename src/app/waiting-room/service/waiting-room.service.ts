import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';
import { IWaitingRoom } from '../model/waiting-room';
import { IWaitingRoomDTO } from '../model/waiting-room-dto';

@Injectable({
  providedIn: 'root'
})
export class WaitingRoomService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findAll(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? '')
        .set('name', data['name'])
        .set('active', data['active'] ?? '')
        .set('sort', data['sort']),
    };

    return this.http.get<PageList>(`${this.apiUrl}/waiting_room/list`, queryParams);
  }

  findActSimpleList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/waiting_room/list-simple`);
  }

  /**
   * It returns an Observable of an array of any type
   * @returns An array of objects with the following properties:
   * - id
   * - name
   * - active
   */
  findActivewaitingRoomNameAndId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/waiting_room/active_waiting_room_name`);
  }

  createwaitingRoom(waiting_room: IWaitingRoomDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/waiting_room/add`, waiting_room);
  }

  updatewaitingRoom(waiting_room: IWaitingRoomDTO): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/waiting_room/update/${waiting_room.id}`,
      waiting_room
    );
  }

  getwaitingRoomDetails(waiting_room: IWaitingRoom): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/waiting_room/get-detail/${waiting_room.id}`
    );
  }
}
