
import { Component, OnInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { BookService } from '../services/book-service';

import { ModelBookData } from '../model.book-data';
import { BookTableModel } from '../model.bookTable';
import { Docs } from '../model.docs';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {

  isColHidden = false;
  isLoading = false;
  bookTitle = '';
  isbn_id = 1840232854;

  book_obj: BookTableModel = { title: '', author_name: '', isbn: '', cover: '', first_publish: 0 };
  arrBookData: Docs[] = [];
  arrDataTable: BookTableModel[] = [];
  arrAuthors: string[] = [];
  imageBlob: Blob;
  imageBlob_url: any;
  selectedBook: BookTableModel;
  dialogVisible: boolean;


  constructor(private bookService: BookService, private sanitizer: DomSanitizer) { }


  ngOnInit(): void { }

  ngOnChanges(): void { }


  showCover(book: BookTableModel) {

    this.isLoading = true;
    this.bookService.getImage(`http://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`).subscribe(

      response => {

        this.isLoading = false;
        this.imageBlob_url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(response));

      }, error => {

        this.isLoading = false;
        console.log('Error while loading large image preview!');
      }

    );
    this.selectedBook = book;
    this.dialogVisible = true;
  } // END showCover()

  getImageBlobFromAPI(image_url: string): void {

    // this.cover_url
    this.bookService.getImage(image_url).subscribe(
      response => {

        this.imageBlob = response;
        console.log('getImage response: ', response);

        // this.image.nativeElement.src = window.URL.createObjectURL(this.imageBlob);
        // this.imageBlob_url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.imageBlob));

      }

    );

  } // END getImageFromAPI()

  search(): void {

    this.getBookInfo(this.bookTitle);

  } // END search()

  getBookInfo(title: string): void {

    this.isLoading = true;
    this.bookService.getBookData(title)
      .subscribe(
      response => {

        this.isLoading = false;
        this.arrBookData = response.docs;
        console.log('response.docs: ', this.arrBookData);

        this.processBookInfo(this.arrBookData);

      }, error => {

        this.isLoading = false;
        console.log('Error on getBookInfo: ', error);

      });

  } // END getBookInfo()

  processBookInfo(bookdocs: Docs[]): void {

    this.arrDataTable = [];

    for (let i = 0; i < bookdocs.length; i++) {

      const obj = Object.create(this.book_obj);
      const arrISBN: number[] = bookdocs[i].isbn;
      let blob_resp: any;
      let blob_url: string;
      let blob_result: string;

      if (arrISBN && arrISBN.length) {

        obj['isbn'] = arrISBN[0];

        blob_url = `http://covers.openlibrary.org/b/isbn/${obj['isbn']}-S.jpg`;
        // Calling getImage with ISBN returns different Blob types
        this.bookService.getImage(blob_url).subscribe(

          response => {

            blob_resp = response;
            obj['cover'] = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob_resp));

          },
          error => {

            console.log('Error while fetching small size image thumbnail');

          });

      } else {

        obj['isbn'] = 'N/A';

      }


      obj['title'] = bookdocs[i].title;
      obj['author_name'] = bookdocs[i].author_name;
      obj['first_publish'] = bookdocs[i].first_publish_year;

      // With all the columns data fetched...the dataTable arr is constructed
      this.arrDataTable.push(obj);

    }


  } // END processBookInfo()



} // END class
