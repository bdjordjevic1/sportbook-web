import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Event } from '../../shared/model/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private http: HttpClient) {}

  createEvent(event: Event) {
    return this.http.post(`${environment.sportbookApiEndpoint}/events`, event);
  }
}
