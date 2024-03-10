import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreadCrumbService } from '../servive/bread-crumb.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

  integerRegX = /^\d+$/

  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(32)]),
    address: new FormControl("", [Validators.required, Validators.maxLength(40)]),
   mobile : new FormControl("", [Validators.required,  Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.integerRegX)] )
  })
  
  getControl(name : any): AbstractControl | null {
    return this.registerForm.get(name)
  }


  registerFn(){
    console.log(this.registerForm.value)
  }

  employeeArray: any[] = []
  employeename: String = ""
  employeeaddress: String = ""
  mobile: number = 0

  currentEmployeeID = ""

constructor(private http: HttpClient, private breadcrumbservice:BreadCrumbService){
  
}

ngOnInit(){
  this.setBreadcrumbs();
  this.getAllEmployee();
}

//Done In Unit Testing
getAllEmployee(){
  this.http.get("http://localhost:8080/api/v1/employee/getAllEmployees").subscribe((resultData: any)=>{
    console.log(resultData)
    this.employeeArray = resultData;
  })
}

//Done In Unit Testing
register(){
  let bodyData = {
    "employeename": this.employeename,
    "employeeaddress": this.employeeaddress,
    "mobile": this.mobile
  }

  this.http.post("http://localhost:8080/api/v1/employee/save", bodyData,{responseType: 'text'}).subscribe((resultData: any) =>{
    console.log(resultData)
    alert("Employee registerd successfully.")
    this.getAllEmployee();

    this.employeename = ""
    this.employeeaddress = ""
    this.mobile = 0;
  })
}

clearData(){
    this.employeename = ""
    this.employeeaddress = ""
    this.mobile = 0;
}

setUpdate(data: any){
  this.employeename = data.employeename;
  this.employeeaddress = data.employeeaddress;
  this.mobile = data.mobile;
  this.currentEmployeeID = data.employeeid; // Update to use employeeid
}

updateRecords(){
  let bodyData = {
    "employeeid": this.currentEmployeeID,
    "employeename": this.employeename,
    "employeeaddress": this.employeeaddress,
    "mobile": this.mobile
  }
  this.http.put("http://localhost:8080/api/v1/employee/update", bodyData, {responseType: 'text'}).subscribe((resultData: any)=>{
    console.log(resultData);
    alert("Details updated succesfully.");
    this.getAllEmployee();

    this.employeename = '';
    this.employeeaddress = '';
    this.mobile = 0
  })
}

save(){
  if (this.currentEmployeeID == ''){
    this.register();
  }else {
    this.updateRecords();
  }
}

setDelete(data: any){
  this.http.delete("http://localhost:8080/api/v1/employee/delete"+"/"+data.employeeid,{responseType: 'text'}).subscribe((resultData)=>{
    console.log(resultData)
    alert("Employee deleted")
    this.getAllEmployee();
    this.employeename = '';
    this.employeeaddress = '';
    this.mobile = 0

  })
}

private setBreadcrumbs(){
     
  this.breadcrumbservice.setBreadcrumbs([
    { label:'Home', url:'/' },
    { label: 'All Customers', url:'/customer'}
  ])
}
}
