import { Component } from '@angular/core';
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { listmodel } from './list.module';
import { CurrencyService } from './currency.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  [x: string]: any;
  constructor(private FB: FormBuilder,private currency : CurrencyService) {}
  

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
  });
}

  

  onSubmit() {
    // console.log(this.currencyForm.value);
    // console.log(this.currencyForm.value.countryName);
    this.listModelObj.coName = this.formValue.value.countryName;
    this.listModelObj.cuName = this.formValue.value.currencyName;
    this.listModelObj.cuCode = this.formValue.value.currencyCode;
    this.listModelObj.status = this.formValue.value.activeStat;
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
}