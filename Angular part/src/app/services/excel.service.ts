import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private httpClient: HttpClient) { 

  }

  uploadFile(file: File): Observable<any> {
    const data: FormData = new FormData();
    data.append('file', file);
    return this.httpClient.post('http://localhost:8090/api/import-data/upload', data, {responseType: 'text'});
  }

  getSummary(): Observable<any> {
    return this.httpClient.get('http://localhost:8090/api/import-data/summary');
  }

}
