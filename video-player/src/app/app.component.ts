import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  SearchbarComponent,
  SearchdData,
} from './components/searchbar/searchbar.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { HistoryComponent } from './components/history/history.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SearchbarComponent,
    BookmarksComponent,
    VideoViewComponent,
    HistoryComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'video-player';
  videoUrl: string = '';
  onVideoAdded(e: SearchdData) {
    console.log(e);
    this.videoUrl = e.url;
  }
}
