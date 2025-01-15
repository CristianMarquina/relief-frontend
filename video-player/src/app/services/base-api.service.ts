import { Injectable } from '@angular/core';
import axiosInstance from './axios-client';
import { Observable } from 'rxjs';

export interface SearchdData {
  url: string;
  name?: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private apiUrl = 'http://localhost:8000/api/v1';

  constructor() {}

  getHistory(): Observable<any> {
    return new Observable((observer) => {
      axiosInstance
        .get('/history')
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  addHistory(history: SearchdData): Observable<any> {
    const payload = {
      url: history.url,
      name: history.name ? history.name : history.url,
    };

    return new Observable((observer) => {
      axiosInstance
        .post('/history', payload)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  // DELETE history
  deleteHistory(id: string): Observable<any> {
    return new Observable((observer) => {
      axiosInstance
        .delete(`/history/${id}`)
        .then(() => {
          observer.next({ message: 'Deleted successfully' });
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  // GET bookmarks
  getBookmarks(): Observable<any> {
    return new Observable((observer) => {
      axiosInstance
        .get('/bookmark')
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  // POST add bookmark
  addBookmark(bookmark: SearchdData): Observable<any> {
    const payload = {
      historyid: bookmark.id,
    };
    return new Observable((observer) => {
      axiosInstance
        .post('/bookmark', payload)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  // DELETE bookmark
  deleteBookmark(id: string): Observable<any> {
    return new Observable((observer) => {
      axiosInstance
        .delete(`/bookmark/${id}`)
        .then(() => {
          observer.next({ message: 'Deleted successfully' });
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }
}
