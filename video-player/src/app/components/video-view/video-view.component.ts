import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'video-view',
  imports: [CommonModule],
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css'],
})
export class VideoViewComponent implements OnChanges {
  @Input() videoUrl: string = '';
  videoId: string | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    this.videoId = this.extractVideoId(this.videoUrl);
    this.videoUrl = this.videoId
      ? (this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${this.videoId}`
        ) as string)
      : '';
  }

  private extractVideoId(url: string): string {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : '';
  }
}
