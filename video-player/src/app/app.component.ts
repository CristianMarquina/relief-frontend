import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  SearchbarComponent,
  SearchdData,
} from './components/searchbar/searchbar.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { HistoryComponent } from './components/history/history.component';
import { CommonModule } from '@angular/common';
import { BaseApiService } from './services/base-api.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SearchbarComponent,
    BookmarksComponent,
    VideoViewComponent,
    HistoryComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'video-player';
  videoUrl: string = '';
  videoName: string = '';
  videoId: string = '';
  historyList: { name: string; url: string; id: string }[] = [];
  bookmarkList: { name: string; url: string; id: string }[] = [];
  constructor(private baseApiService: BaseApiService) {}
  ngOnInit(): void {
    this.baseApiService.getHistory().subscribe({
      next: (response) => {
        const historyList = response.histories;
        this.historyList = [...historyList];
      },
      error: (error) => {
        console.error('Error al obtener el historial:', error);
      },
    });
    this.baseApiService.getBookmarks().subscribe({
      next: (response) => {
        const bookmarks = response.bookmarks.map((bookmark: any) => ({
          id: bookmark.id,
          name: bookmark.history.name,
          url: bookmark.history.url,
        }));

        this.bookmarkList = [...bookmarks];
      },
      error: (error) => {
        console.error('Error al obtener el historial:', error);
      },
    });
  }

  onVideoAdded(e: SearchdData) {
    this.videoUrl = e.url;
    this.videoName = e.name ? e.name : e.url;
    this.videoId = e.id;
    this.baseApiService.getHistory().subscribe({
      next: (response) => {
        const historyList = response.histories;
        this.historyList = [...historyList];
      },
      error: (error) => {
        console.error('Error al obtener el historial:', error);
      },
    });
  }

  onBookmarkAdded(e: SearchdData) {
    this.baseApiService.getBookmarks().subscribe({
      next: (response) => {
        const bookmarks = response.bookmarks.map((bookmark: any) => ({
          id: bookmark.id,
          name: bookmark.history.name,
          url: bookmark.history.url,
        }));

        this.bookmarkList = [...bookmarks];
      },
      error: (error) => {
        console.error('Error al obtener el historial:', error);
      },
    });
  }

  onHistorySelected(e: SearchdData) {
    this.videoUrl = e.url;
    this.videoId = e.id;
    this.videoName = e.name ?? '';
  }

  onHistoryDeleted(e: SearchdData) {
    this.baseApiService.deleteHistory(e.id).subscribe({
      next: (response) => {
        this.deleteHistoryById(e.id);
      },
      error: (error) => {
        console.error('Error getting history:', error);
      },
    });
  }
  onBookmarkDeleted(e: SearchdData) {
    this.baseApiService.deleteBookmark(e.id).subscribe({
      next: (response) => {
        this.deleteBookmarkById(e.id);
      },
      error: (error) => {
        console.error('Error gettitng the bookmark:', error);
      },
    });
  }

  onBookmarkSelect(e: SearchdData) {
    this.videoUrl = e.url;
  }
  deleteHistoryById(idToDelete: string) {
    const index = this.historyList.findIndex(
      (history) => history.id === idToDelete
    );

    if (index !== -1) {
      this.historyList.splice(index, 1);
    } else {
      console.log('dint find the element with the specified ID');
    }
  }
  deleteBookmarkById(idToDelete: string) {
    const index = this.bookmarkList.findIndex(
      (bookmark) => bookmark.id === idToDelete
    );

    if (index !== -1) {
      this.bookmarkList.splice(index, 1);
    } else {
      console.log('dint find the element with the specified ID');
    }
  }
}
