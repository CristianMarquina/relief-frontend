import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchdData } from '../searchbar/searchbar.component';

@Component({
  selector: 'bookmarks',
  imports: [CommonModule],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent {
  @Input() currentVideo: { name: string; url: string } | null = null;
  @Output() playVideo = new EventEmitter<SearchdData>();

  @Output() selectHistory = new EventEmitter<SearchdData>();
  bookmarksList: { name: string; url: string }[] = [];
  showBookmarks = false;
  addBookmark(): void {
    if (this.currentVideo) {
      this.bookmarksList.push({ ...this.currentVideo });
    }
  }

  toggleBookmarkList(): void {
    this.showBookmarks = !this.showBookmarks;
  }

  onSelectBookmark(url: string): void {
    this.playVideo.emit({ url: url, name: url });
  }

  onDeleteBookmark(index: number): void {
    this.bookmarksList.splice(index, 1);
  }

  truncateUrl(url: string, maxLength: number): string {
    if (url.length > maxLength) {
      return url.substring(0, maxLength) + '...';
    }
    return url;
  }
}
