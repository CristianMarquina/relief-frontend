import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private apiUrl = 'http://your-backend-url/api'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  getHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`);
  }

  addHistory(history: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/history`, history, { headers });
  }

  deleteHistory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/history/${id}`);
  }

  getBookmarks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookmarks`);
  }

  addBookmark(bookmark: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/bookmarks`, bookmark, { headers });
  }

  deleteBookmark(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookmarks/${id}`);
  }
}
