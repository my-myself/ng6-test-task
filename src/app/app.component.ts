import { Component, OnDestroy } from '@angular/core';
import { SelectedCommentsService } from 'src/app/services/seclected-comments-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  selectedIndex = -1;
  private subs: Subscription[] = [];
  constructor(private commentsService: SelectedCommentsService) {
    this.subs.push(
      this.commentsService.getIndex()
        .subscribe((index: number) => {
          this.selectedIndex = index > -1 ? index + 1 : - 1;
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
