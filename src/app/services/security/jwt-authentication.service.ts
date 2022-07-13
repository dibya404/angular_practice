import { JPA_API_URL } from '../../app.constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Parameters } from 'src/app/parameters';

export const TOKEN = 'token';
export const SESSIONID = 'sessionid';
export const AUTHENTICATED_ID = 'authenticaterUserId';
export const AUTHENTICATED_NAME = 'authenticaterUserName';
export const AUTHENTICATED_DESIGNATION = 'authenticaterUserDesignation';
import { DatePipe } from '@angular/common';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JwtAuthenticationService {

  formatedDate: any;
  sysDate = new Date(Date.now());
  dateParam: any;
  successfulResponse: any;
  errorResponse: any;
  datepipe: any;

  constructor(
    private httpClient: HttpClient,
    private datePipe: DatePipe,
  ) { }

  tokenVal = '';
  userId = '';
  compcode = '';
  userCode = '';
  userGroupCode = '';
  userName: any = '';
  designation: any = '';
  companyName: any = '';
  branchName: any = '';
  hubType: any = '';
  branchCode: any = '';
  errorCode: any = '';
  errorMsg: any = '';
  nodes: any = [];
  menuList: any = [];

  ///////Error Handeling//////////
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error: ', errorResponse.error);
    }
    return throwError(errorResponse.message+'There is the problem on Service');
    // return throwError(errorResponse.error);
  }


  executeJWTAuthenticationService(username: any, password: any) {
    return this.httpClient.post<any>(`${JPA_API_URL}/e-swift/authenticate`, { username, password }).pipe(
      map(
        data => {
          this.tokenVal = `${data.token}`;
          //console.log("Token: "+this.tokenVal);
          if (this.tokenVal.length > 0) {
            this.hubType = `${data.map.hubType}`;
            this.designation = `${data.map.userInfo.usertype}`;
            this.userGroupCode = `${data.map.userInfo.grupcode}`;
            this.companyName = "Bank Asia";
            this.branchName = `${data.map.userBranchName}`;
            this.branchCode = `${data.map.userBranchCode}`;
            console.log("JWTAuthentication hubType: " + this.hubType);
            console.log("JWTAuthentication branchCode: " + this.branchCode);
            //console.log(this.userName + ' - ' + this.designation);              
            sessionStorage.setItem('authenticaterUserDesignation', this.designation);
            sessionStorage.setItem('companyName', this.companyName);
            sessionStorage.setItem('branchCode', this.branchCode);
            sessionStorage.setItem('branchName', this.branchName);
            sessionStorage.setItem('hubType', this.hubType);
            sessionStorage.setItem('userGroupCode', this.userGroupCode);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            sessionStorage.setItem(AUTHENTICATED_ID, `${data.map.userInfo.usercode}`);
            sessionStorage.setItem(AUTHENTICATED_NAME, `${data.map.userInfo.username}`);

            sessionStorage.setItem('checkMenu', '');
            this.errorMsg = data.map.errorMsg;
            return data;
          } else {
            return data;
          }
        }
      ), catchError(this.handleError)
    );
  }


  getAuthenticatedUser() {
    sessionStorage.setItem('checkMenu', '');
    return sessionStorage.getItem(AUTHENTICATED_ID)
  }

  getAuthenticatedToken(): any {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
  }

  logOut() {
    sessionStorage.removeItem(AUTHENTICATED_ID);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(AUTHENTICATED_NAME);
    sessionStorage.removeItem('authenticaterUserDesignation');
    sessionStorage.removeItem('checkMenu');
    sessionStorage.removeItem('userGroupCode');
    sessionStorage.removeItem('companyName');
    sessionStorage.removeItem('branchName');
    sessionStorage.removeItem('hubType');
    sessionStorage.removeItem('branchCode');
    this.branchCode = "";
    this.branchName = "";
    this.hubType = "";
    this.designation = "";
    this.userGroupCode = "";
  }

  isUserLoggedIn() {
    let userId = sessionStorage.getItem(AUTHENTICATED_ID);
    this.userName = sessionStorage.getItem(AUTHENTICATED_NAME);
    this.designation = sessionStorage.getItem('authenticaterUserDesignation');
    this.companyName = sessionStorage.getItem('companyName');
    this.branchName = sessionStorage.getItem('branchName');
    this.hubType = sessionStorage.getItem('hubType');
    this.branchCode = sessionStorage.getItem('branchCode');
    return !(userId === null);
  }

  getFormatedSysDate(dateParam: any) {
    //dateParam = Wed Feb 02 2022 15:58:19 GMT+0600 (Bangladesh Standard Time)
    this.formatedDate = this.datePipe.transform(dateParam, 'dd-MMM-yyyy');
    //console.log("this.formatedDate: "+ this.formatedDate);
    // this.formatedDate = 02-Feb-2022
    return this.formatedDate;
  }

  
  getDateForSwift(dateParam: any) {
    // console.log('dateParam: '+dateParam);
    //dateParam = Wed Feb 02 2022 15:58:19 GMT+0600 (Bangladesh Standard Time)
    this.formatedDate = this.datePipe.transform(dateParam, 'yyMMdd');
    // console.log("this.formatedDate: "+ this.formatedDate);
    // this.formatedDate = 220509
    return this.formatedDate;
  }

  getDateForCalender(dateParam: any) {
    // console.log('dateParam: '+dateParam);
    //dateParam = Wed Feb 02 2022 15:58:19 GMT+0600 (Bangladesh Standard Time)
    this.formatedDate = this.datePipe.transform(dateParam, 'yyyy-MM-dd');
    // console.log("this.formatedDate: "+ this.formatedDate);
    // this.formatedDate = 220509
    return this.formatedDate;
  }

  getFormDate(dateParam: any) {
    // console.log('dateParam: '+dateParam);
    //dateParam = Wed Feb 02 2022 15:58:19 GMT+0600 (Bangladesh Standard Time)
    this.formatedDate = this.datePipe.transform(dateParam, 'dd-MMM-yyyy');
    // console.log("this.formatedDate: "+ this.formatedDate);
    // this.formatedDate = 02-Feb-2022
    return this.formatedDate;
  }


getDateAsDDMMYY(dateParam: any) {
  //dateParam = Wed Feb 02 2022 15:58:19 GMT+0600 (Bangladesh Standard Time)
  this.formatedDate = this.datePipe.transform(dateParam, 'dd/MM/yyyy');
  //console.log("this.formatedDate: "+ this.formatedDate);
  // this.formatedDate = 02-Feb-2022
  return this.formatedDate;
}
}

export class AuthenticationBean {
  constructor(public message: string) {
  }


}
