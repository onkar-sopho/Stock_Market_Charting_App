import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../components/manage-company/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) { }

  addCompany(companyRequestPayload: Company): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8090/api/company/add', companyRequestPayload);
  }

  deleteCompany(id: number): Observable<any> {
    return this.httpClient.delete('http://localhost:8090/api/company/delete/'+id, {responseType: 'text'});
  }

  updateCompany(id: number, company: any) {
    return this.httpClient.put('http://localhost:8090/api/company/update/'+id, company);
  }

  getCompanies(): Observable<any> {
    return this.httpClient.get('http://localhost:8090/api/company/all');
  }

  getCompanyById(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8090/api/company/find/' + id);
  }

  getCompanyByName(name: String): Observable<any> {
    return this.httpClient.get('http://localhost:8090/api/company/find/' + name);
  }

}
