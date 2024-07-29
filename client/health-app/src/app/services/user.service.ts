import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = '/api/data/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getUserDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  reportHealthIssue(issueData: any): Observable<any> {
    return this.http.post<any>(`/api/report/issue`, issueData);
  }

  uploadCsv(formData: FormData): Observable<HttpEvent<any>> {
    return this.http.post<any>(`/api/file/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
