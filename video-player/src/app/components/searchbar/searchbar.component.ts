import { Component, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';

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

  addVideo() {
    if (this.videoUrl.trim() && this.videoUrl.trim()) {
      this.videoAdded.emit({ url: this.videoUrl, name: this.videoName });
      this.videoUrl = '';
      this.videoName = '';
    }
  }
}
