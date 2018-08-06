import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Items } from 'src/app/interfaces/items.interface';
import { LocalStorageService } from 'src/app/services/local-storage-service';
import { SelectedCommentsService } from 'src/app/services/seclected-comments-service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnDestroy {

  isLoading = true;
  selectedIndex = -1;
  newName: string;
  items: Items[] = [];
  private subs: Subscription[] = [];

  constructor(
    private storage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private comments: SelectedCommentsService
  ) {
    this.spinner.show();
    this.subs.push(
      this.storage.getItems().pipe(
        switchMap((items: Items[]) => {
          this.items = items ? items : [];
          return comments.getIndex();
        }))
        .subscribe((index: number) => {
          this.selectedIndex = index;
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
    this.storage.addItem({
      title: this.newName,
      comments: []
    });
    this.newName = '';
  }

  delete(index: number): void {
    this.storage.deleteItem(index);
    if (this.selectedIndex === index && this.items.length > 0) {
      this.select(this.items.length - 1);
    } else {
      this.select(-1);
    }
  }

  select(index: number): void {
    const item = index >= 0 ? this.items[index].comments : null;
    this.comments.setItem(item, index);
  }

}
