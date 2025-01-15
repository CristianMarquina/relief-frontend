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
  @Input() historyList: { name: string; url: string; id: string }[] = [];
  @Output() selectHistory = new EventEmitter<SearchdData>();
  @Output() deleteHistory = new EventEmitter<SearchdData>();
  isSidebarOpen: boolean = true;
  selectedId: string = '';
  //selectedName: string = '';

  onToggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onSelectHistory(url: string, name: string, id: string) {
    this.selectedId = id;
    this.selectHistory.emit({ url: url, name: name, id: id });
  }

  onDeleteHistory(e: SearchdData) {
    this.deleteHistory.emit(e);
  }

  truncateUrl(url: string, maxLength: number = 50): string {
    return url.length > maxLength ? url.slice(0, maxLength) + '...' : url;
  }
}
