import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ItemsComponent } from './components/items/items.component';
import { LocalStorageService } from './services/local-storage-service';
import { SelectedCommentsService } from './services/seclected-comments-service';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CommentsComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxSpinnerModule,

    AppRoutingModule
  ],
  providers: [LocalStorageService, SelectedCommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
