import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseApiService } from '../../services/base-api.service';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';
export type SearchdData = {
  url: string;
  name: string | null;
  id: string;
};
@Component({
  selector: 'searchbar',
  imports: [FormsModule, MatIconModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  videoUrl: string = '';
  videoName: string = '';
  videoId: string = '';
  @Input() currentVideo: { name: string; url: string; id: string } | null =
    null;
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
