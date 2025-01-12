import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchdData } from '../searchbar/searchbar.component';

@Component({
  selector: 'history',
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  @Input() historyList: { name: string; url: string }[] = [];
  @Output() selectHistory = new EventEmitter<SearchdData>();
  @Output() deleteHistory = new EventEmitter<number>();
  isSidebarOpen: boolean = true;

  onToggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onSelectHistory(url: string) {
    this.selectHistory.emit({ url: url, name: url });
  }

  onDeleteHistory(index: number) {
    this.deleteHistory.emit(index);
  }

  truncateUrl(url: string, maxLength: number = 50): string {
    return url.length > maxLength ? url.slice(0, maxLength) + '...' : url;
  }
}
