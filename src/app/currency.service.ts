import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { Parameters } from 'src/app/parameters';
import { JPA_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  //httpClient: any;

  constructor(private httpClient:HttpClient) { }

  // CurrencyInsertUpdateService(params: Parameters): Observable<any> {
  //   console.log();
  //   return this.httpClient.post(`${JPA_API_URL}/e-swift/mtCatagoryEntry`, params)
  //   .pipe(catchError(this.handleError));
  // }

  CurrencyDataShowService(params: Parameters): Observable<any> {
    console.log();
    return this.httpClient.post(`${JPA_API_URL}/e-swift/currencyCurd`, params)
    .pipe(catchError(this.handleError));
  }

  handleError(handleError: any): any {
    throw new Error('Method not implemented.');
  }

  // PostData(data :any){
  //   return this.http.post<any>("http://localhost:3000/posts",data)
  //   .pipe(map((res:any)=>{
  //   return res;
  //  }))
  // }

  // url  = 'http://localhost:3000/posts';

  // GetData(){
  //   return this.http.get<any>(this.url)
  // }

  // DeletetData(id:number){
  //   return this.http.delete<any>("http://localhost:3000/posts/"+id)
  // }

  
}