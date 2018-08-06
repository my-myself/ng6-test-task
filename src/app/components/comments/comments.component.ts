import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectedCommentsService } from 'src/app/services/seclected-comments-service';
import { LocalStorageService } from 'src/app/services/local-storage-service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnDestroy {

  isLoading = true;
  selectedIndex = - 1;
  newComment = '';
  comments: string[] = [];
  private subs: Subscription[] = [];

  constructor(
    private commentsService: SelectedCommentsService,
    private spinner: NgxSpinnerService,
    private storage: LocalStorageService) {
    this.subs.push(
      this.commentsService.getIndex().pipe(
        switchMap((index: number) => {
          this.selectedIndex = index;
          return commentsService.getItem();
        }))
        .subscribe((comments: string[]) => {
          this.comments = comments;
          this.isLoading = false;
          this.spinner.hide();
        }, (ex) => {
          alert(ex);
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  add(): void {
    if (this.newComment !== '') {
      this.storage.addComment(this.newComment, this.selectedIndex);
      this.newComment = '';
    }
  }

}
