import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Creditur } from '../../../model/creditur.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api: string = 'https://685cee53769de2bf085e7b8a.mockapi.io/jatuhtempo/usersDueDate'
  constructor(private http: HttpClient) { }

  getData(): Observable<Creditur[]> {
  return this.http.get<Creditur[]>(this.api);
}

  
  addData(data: Creditur){
    return this.http.post(this.api, data);
  }

  deleteData(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
