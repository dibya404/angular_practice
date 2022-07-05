import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http:HttpClient) { }
  PostData(data :any)
  {return this.http.post<any>("http://localhost:3000/posts",data)
   .pipe(map((res:any)=>{
    return res;
   }))
  }
  url  = 'http://localhost:3000/posts';
   GetData()
  {
    return this.http.get<any>(this.url)
  }

  
}