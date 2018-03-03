import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  AutoCompleteModule,
  ButtonModule,
  InputTextModule,
  DataTableModule,
  DialogModule
} from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/components/progressspinner/progressspinner';
import { BlockUIModule } from 'primeng/components/blockui/blockui';




import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookService } from './services/book-service';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    BlockUIModule,
    DataTableModule,
    DialogModule

  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
