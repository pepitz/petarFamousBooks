// tslint:disable:prefer-const

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import { ModelBookData } from '../model.book-data';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) {

  }

  getHeaders(): HttpHeaders {

    const headers = new HttpHeaders();
    return headers;
  }


  getBookData(booktitle: string): Observable<ModelBookData> {
    return this.http.get<ModelBookData>(`http://openlibrary.org/search.json?title=${booktitle}`);
  }

  getImage(image_url: string): Observable<Blob> {
    return this.http
      .get(image_url, {
        responseType: 'blob'
      });
  }

} // END class
