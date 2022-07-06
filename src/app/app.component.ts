import { Component } from '@angular/core';
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { listmodel } from './list.module';
import { CurrencyService } from './currency.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  [x: string]: any;
  currentDateTime : any;
  constructor(private FB: FormBuilder,private currency : CurrencyService,public datepipe: DatePipe) {
    
  }
  
 
  
  listModelObj : listmodel = new listmodel();
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
}

  

  onSubmit() {
    // console.log(this.currencyForm.value);
    // console.log(this.currencyForm.value.countryName);
    this.listModelObj.curDate =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss')
    this.listModelObj.coName = this.formValue.value.countryName;
    this.listModelObj.cuName = this.formValue.value.currencyName;
    this.listModelObj.cuCode = this.formValue.value.currencyCode;
    this.listModelObj.status = this.formValue.value.activeStat;
    this.listModelObj.createBy = this.formValue.value.createBy;
    //this.listModelObj.curDate = this.formValue.value.currentDateTime;
    this.listModelObj.updateBy = this.formValue.value.updateBy;
    this.currency.PostData(this.listModelObj)
    .subscribe(res =>{console.log(res);
    alert("added");
    }/*,
    err=> {alert("wrong");}*/)
    this.formValue.reset();
    this.getAllData();
    
  }
  getAllData(){
    this.currency.GetData()
    .subscribe(res=>{
      this.curData = res;
    })
  }
  delData(row :any)
  {
    this.currency.DeletetData(row.id)
    .subscribe(res=>{
      this.curData = res;
    })
    alert("deleted");
  }
}