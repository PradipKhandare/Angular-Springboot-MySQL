import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CustomerComponent } from "./customer.component"
import { HttpClient } from "@angular/common/http";
import { BreadCrumbService } from "../servive/bread-crumb.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CustomerComponent', () => {

    let component: CustomerComponent;
    let fixture: ComponentFixture<CustomerComponent>;
    let httpMock: HttpTestingController;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomerComponent],
            imports: [HttpClientModule,HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
        })
        .compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(CustomerComponent);
        component = fixture.componentInstance;
        httpMock = TestBed.inject(HttpTestingController);
      });

      afterEach(() => {
        httpMock.verify();
      });


    it('should send data to the server', () => {
        spyOn(component, 'getAllEmployee');

        const mockResponse = 'Employee registered successfully.';
        const bodyData = {
            employeename: 'John Doe',
            employeeaddress: '123 Main St',
            mobile: 555555};

        component.employeename = bodyData.employeename
        component.employeeaddress = bodyData.employeeaddress
        component.mobile = bodyData.mobile;

        component.register();
        const req = httpMock.expectOne('http://localhost:8080/api/v1/employee/save');
        expect(req.request.method).toBe('POST')
        expect(req.request.body).toEqual(bodyData)

        req.flush(mockResponse)

        expect(component.employeename).toBe('')
        expect(component.employeeaddress).toBe('')
        expect(component.mobile).toBe(0)

        expect(component.getAllEmployee).toHaveBeenCalled();
        })  
        
        
        it('should display all the data from databse', () => {
            const mockResponse = [
                {employeename: 'pradip khandare', employeeaddress: 'pune', mobile: 99999},
                {employeename: 'pradip k', employeeaddress: 'mumbai', mobile: 8888}
            ]

            component.getAllEmployee()

            const req = httpMock.expectOne('http://localhost:8080/api/v1/employee/getAllEmployees')
            expect(req.request.method).toBe('GET')

            req.flush(mockResponse);

            expect(component.employeeArray.length).toBe(2)
            expect(component.employeeArray[0].employeename).toBe('pradip khandare')
            expect(component.employeeArray[1].employeeaddress).toBe('mumbai')
        })

        it('should update data into database.', () => {
            spyOn(component, 'getAllEmployee');
            const mockResponse = 'Details updates successfully.';

            component.currentEmployeeID = '123';
            component.employeename = 'Prad';
            component.employeeaddress = 'Pune';
            component.mobile = 999999;

            component.updateRecords();

            const req = httpMock.expectOne('http://localhost:8080/api/v1/employee/update')
            expect(req.request.method).toBe('PUT')

            expect(req.request.body).toEqual({
                "employeeid": '123',
                "employeename": 'Prad',
                "employeeaddress": 'Pune',
                "mobile": 999999
            })
            req.flush(mockResponse)

            expect(component.employeename).toBe('');
            expect(component.employeeaddress).toBe('');
            expect(component.mobile).toBe(0);

            expect(component.getAllEmployee).toHaveBeenCalled()
        })


        it('should delete the data', () => {
            spyOn(component, 'getAllEmployee')
            const data = {employeeid: '123'}
            const mockResponse = 'Data deleted successfully.'

            component.setDelete(data)

            const req = httpMock.expectOne('http://localhost:8080/api/v1/employee/delete/123')
            expect(req.request.method).toBe('DELETE')

            req.flush(mockResponse);

            expect(component.employeename).toBe('')
            expect(component.employeeaddress).toBe('')
            expect(component.mobile).toBe(0)
        })
})