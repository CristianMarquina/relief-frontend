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
  historyList: { name: string; url: string }[] = [];

  onVideoAdded(e: SearchdData) {
    console.log(e);
    this.videoUrl = e.url;
    this.historyList.push({ name: e.name ? e.name : e.url, url: e.url });
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
