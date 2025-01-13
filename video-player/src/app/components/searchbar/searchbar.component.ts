import { Component, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { BaseApiService } from '../../services/base-api.service';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
export type SearchdData = {
  url: string;
  name: string | null;
  id: string;
};
@Component({
  selector: 'searchbar',
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  videoUrl: string = '';
  videoName: string = '';
  videoId: string = '';
  @Output() videoAdded = new EventEmitter<SearchdData>();
  constructor(private baseApiService: BaseApiService) {}

  addVideo() {
    if (this.videoUrl.trim() && this.videoUrl.trim()) {
      const historyData = {
        url: this.videoUrl,
        name: this.videoName,
        id: '',
      };
      this.baseApiService.addHistory(historyData).subscribe({
        next: (response) => {
          this.videoAdded.emit({
            url: response.history.url,
            name: response.history.name,
            id: response.history.id,
          });
          this.videoUrl = '';
          this.videoName = '';
          this.videoId = '';
        },
        error: (error) => {
          console.error('Error adding video:', error);
        },
      });
    }
  }
}
