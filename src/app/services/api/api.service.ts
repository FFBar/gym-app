import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3000/enquiry';

  constructor(private http: HttpClient) {}

  postRegistration(registerObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, registerObj);
  }

  getRegisteredUsers() {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  updateRegisteredUser( registerObj: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj);
  }

  deleteRegisteredUser(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }

  getRegisteredUserById(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
