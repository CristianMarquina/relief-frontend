import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchdData } from '../searchbar/searchbar.component';
import { BaseApiService } from '../../services/base-api.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'bookmarks',
  imports: [CommonModule, MatIconModule],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent {
  @Input() bookmarkList: { name: string; url: string; id: string }[] = [];
  @Input() currentVideo: { name: string; url: string; id: string } | null =
    null;
  @Output() playVideo = new EventEmitter<SearchdData>();
  @Output() selectHistory = new EventEmitter<SearchdData>();
  @Output() BookmarkAdded = new EventEmitter<SearchdData>();
  @Output() deleteBookmark = new EventEmitter<SearchdData>();
  constructor(private baseApiService: BaseApiService) {}
  //bookmarksList: { name: string; url: string; id: string }[] = [];
  showBookmarks = false;
  addBookmark(): void {
    if (this.currentVideo) {
      const bookmarkData = {
        url: this.currentVideo.url,
        name: this.currentVideo.name,
        id: this.currentVideo.id,
      };
      this.baseApiService.addBookmark(bookmarkData).subscribe({
        next: (response) => {
          const bookmarkData = {
            url: this.currentVideo?.url ?? '',
            name: this.currentVideo?.name ?? '',
            id: response.id,
          };
          this.BookmarkAdded.emit(bookmarkData);
        },
        error: (error) => {
          console.error('Error adding video:', error);
        },
      });
    }
  }

  toggleBookmarkList(): void {
    this.showBookmarks = !this.showBookmarks;
  }

  onSelectBookmark(url: string, name: string, id: string): void {
    this.playVideo.emit({ url: url, name: name, id: id });
  }

  onDeleteBookmark(e: SearchdData): void {
    this.deleteBookmark.emit(e);
  }

  truncateUrl(url: string, maxLength: number): string {
    if (url.length > maxLength) {
      return url.substring(0, maxLength) + '...';
    }
    return url;
  }
}
