import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Items } from '../interfaces/items.interface';
import { environment } from '../../environments/environment';

@Injectable()
export class LocalStorageService {

  private items: Items[] = [];
  private $items: BehaviorSubject<Items[]> = new BehaviorSubject<Items[]>(null);

  constructor() {
    this.items = this.getItemsfromStorage();
  }

  getItems(): Observable<Items[]> {
    const items = this.getItemsfromStorage();
    this.items = items ? items : [];
    this.$items.next(this.items);
    return this.$items;
  }

  addItem(item: Items): void {
    if (this.$items && this.items) {
      this.items.push(item);
      localStorage.setItem(environment.storageKey, JSON.stringify(this.items));
      this.$items.next(this.items);
    }
  }

  addComment(comment: string, index: number): void {
    if (this.$items && this.items && this.items.length - 1 >= index) {
      this.items[index].comments.push(comment);
      localStorage.setItem(environment.storageKey, JSON.stringify(this.items));
      this.$items.next(this.items);
    }
  }

  deleteItem(index: number): void {
    if (this.$items && this.items) {
      this.items.splice(index, 1);
      localStorage.setItem(environment.storageKey, JSON.stringify(this.items));
      this.$items.next(this.items);
    }
  }

  private getItemsfromStorage(): Items[] {
    return JSON.parse(localStorage.getItem(environment.storageKey));
  }
}
