import { Component, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { BaseApiService } from '../../services/base-api.service';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
export type SearchdData = {
  url: string;
  name: string | null;
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
  @Output() videoAdded = new EventEmitter<SearchdData>();
  constructor(private baseApiService: BaseApiService) {}

  addVideo() {
    console.log('en el 111111');
    if (this.videoUrl.trim() && this.videoUrl.trim()) {
      console.log('22222222222222222222');
      const historyData = { url: this.videoUrl, name: this.videoName };
      console.log('3333333333333333333333333333');
      this.baseApiService.addHistory(historyData).subscribe({
        next: (response) => {
          console.log('77777777777777777777777');
          console.log('Video added successfully:', response);
          this.videoAdded.emit(historyData);
          this.videoUrl = '';
          this.videoName = '';
        },
        error: (error) => {
          console.error('Error adding video:', error);
        },
      });
    }
  }
}
