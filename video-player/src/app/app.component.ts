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
        console.log('getBookmarks cargado al iniciar la página:');
        console.log(response); // Verifica la estructura de la respuesta
        const bookmarks = response.bookmarks.map((bookmark: any) => ({
          id: bookmark.id,
          name: bookmark.history.name,
          url: bookmark.history.url,
        }));

        this.bookmarkList = [...bookmarks];
        console.log(
          'getBookmarks cargado al iniciar la página: depsues de actualizarlos'
        );
        console.log(this.bookmarkList);
        // const bookmarks = response.bookmarks;
        // this.bookmarkList = [...bookmarks];
      },
      error: (error) => {
        console.error('Error al obtener el historial:', error);
      },
    });
  }

  onVideoAdded(e: SearchdData) {
    this.videoUrl = e.url;
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

  onHistorySelected(e: SearchdData) {
    this.videoUrl = e.url;
  }

  onHistoryDeleted(index: number) {
    this.historyList.splice(index, 1);
  }

  onBookmarkSelect(e: SearchdData) {
    this.videoUrl = e.url;
    console.log(`Reproduciendo desde bookmark: ${e.url}`);
  }
}
