import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SelectedCommentsService {

  private $comments: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);
  private $selectedIndex: BehaviorSubject<number> = new BehaviorSubject<number>(-1);


  setItem(comments: string[], index): void {
    if (this.$comments && this.$selectedIndex) {
      this.$comments.next(comments);
      this.$selectedIndex.next(index);
    }
  }

  getIndex(): Observable<number> {
    return this.$selectedIndex;
  }

  getItem(): Observable<string[]> {
    return this.$comments;
  }
}
