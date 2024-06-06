import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { CompanyData } from "../models/company-data";

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {

  baseUrl: string = 'http://localhost:8080/company-data';
  totalPages: number = 0;
  totalElements: number = 0;

  constructor(private http: HttpClient) { }

  getCompanyData(page?: number): Observable<Array<CompanyData>> {
    return this.http.get(`${this.baseUrl}?page=${page}`).pipe(tap((response: any) => {
        this.totalPages = response.page.totalPages
        this.totalElements = response.page.totalElements;
      }),
      this.mapResponse()) as unknown as Observable<Array<CompanyData>>;
  }

  private mapResponse<T>() {
    return map((response: ApiResponse<T, 'companyData'>) => response._embedded?.companyData);
  }
}
