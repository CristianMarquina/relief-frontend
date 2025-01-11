import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { HistoryComponent } from './components/history/history.component';
import { empty } from 'rxjs';
import { EventEmitter } from 'stream';

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
  onVideoAdded(e: Object) {
    console.log(e);
  }
}
