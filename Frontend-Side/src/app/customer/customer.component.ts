import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

  employeeArray: any[] = []
  employeename: String = ""
  employeeaddress: String = ""
  mobile: number = 0

  currentEmployeeID = ""

constructor(private http: HttpClient){
  this.getAllEmployee()
}

getAllEmployee(){
  this.http.get("http://localhost:8080/api/v1/employee/getAllEmployees").subscribe((resultData: any)=>{
    console.log(resultData)
    this.employeeArray = resultData;
  })
}

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
}
