import { Component } from '@angular/core';
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { listmodel } from './list.module';
import { CurrencyService } from './currency.service';
import { DatePipe } from '@angular/common';
import { Parameters } from './parameters';
import { JwtAuthenticationService } from 'src/app/services/security/jwt-authentication.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  [x: string]: any;
  currentDateTime : any;

  constructor(
    private FB: FormBuilder,
    private currency : CurrencyService,
    public datepipe: DatePipe,
    private jwtAuthenticationService: JwtAuthenticationService,
  ) {}
  
 
  
//paramobj : listmodel = new listmodel();
 paramobj : Parameters = new Parameters();
 curData : any;
  formValue !: FormGroup;

 /* activeStatus: string = 'Inactive';
  coName: string = "";
  cuName: string = "";
  cuCode: string = "";
  status: string = "";*/
 

ngOnInit()
{
  this.formValue= this.FB.group({
    countryName: [''],
    currencyName: [''],
    currencyCode: [''],
    activeStat: [''],
    createBy : [''],
    updateBy : [''],
    
    
  });
  //this.getAllData();
}

  

  onSubmit() {
    // console.log(this.currencyForm.value);
    // console.log(this.currencyForm.value.countryName);
    this.paramobj.create_date = this.jwtAuthenticationService.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss')
    this.paramobj.country_name = this.formValue.value.countryName;
    this.paramobj.currency_name = this.formValue.value.currencyName;
    this.paramobj.currency_code = this.formValue.value.currencyCode;
    this.paramobj.active_flag = this.formValue.value.activeStat;
    this.paramobj.create_by = this.formValue.value.createBy;
    //this.paramobj.curDate = this.formValue.value.currentDateTime;
    this.paramobj.update_by = this.formValue.value.updateBy;
    this.currency.CurrencyDataShowService(this.paramobj).subscribe(res=>{
      console.log(res);
      alert("added");
    }/*,
    err=> {alert("wrong");}*/)
    this.formValue.reset();
    //this.getAllData();
    
  }
}
//   getAllData(){
//     this.currency.GetData()
//     .subscribe(res=>{
//       this.curData = res;
//     })
//   }
//   delData(row :any)
//   {
//     this.currency.DeletetData(row.id)
//     .subscribe(res=>{
//       this.curData = res;
//     })
//     alert("deleted");
//     this.getAllData();
//   }
// }

// // get=getCurrencyDataShow
// post=currencyCurd
// currencyCode; //currency_code
// currencyName; //currency_name
// countryName; //country_name
// activeFlag;  //active_flag
// createBy;  //create_by
// createDate;  //create_date
// updateBy; //update_by
// updateDate;  //update_date
// errorNum=0;    //out pare
// errorMsg  = "";
