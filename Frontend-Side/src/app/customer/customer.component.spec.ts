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

        it('should call and getAllEmployee on ngOnInit', () => {
            spyOn(component, 'getAllEmployee')
            component.ngOnInit();
            // expect(component.setBreadcrumbs).toHaveBeenCalled();
            expect(component.getAllEmployee).toHaveBeenCalled();
        })

        it('should set update data correctly', () => {
            const testData = {
                employeename: 'Pradip Khandare',
                employeeaddress: 'Pune',
                mobile: 99999999,
                employeeid: '1'
            }

            component.setUpdate(testData);

            expect(component.employeename).toEqual(testData.employeename)
            expect(component.employeeaddress).toEqual(testData.employeeaddress)
            expect(component.mobile).toEqual(testData.mobile)
            expect(component.currentEmployeeID).toEqual(testData.employeeid)
        })

        it('should called register() if currentEmployeeID is empty', () => {
            spyOn(component, 'register')
            component.currentEmployeeID = '';
            component.save();

            expect(component.register).toHaveBeenCalled();
        })

        it('should called updateRecords() if currentEmployee is not empty', () => {
            spyOn(component, 'updateRecords')
            component.currentEmployeeID = '1'

            component.save();

            expect(component.updateRecords).toHaveBeenCalled();
        })

        it('should clear the data when called clear()', () => {
            const testData = {
                employeename: 'Pradip Khandare',
                employeeaddress: 'Pune',
                mobile: 99999999
            }

            component.clearData();

            expect(component.employeename).toBe('')
            expect(component.employeeaddress).toBe('')
            expect(component.mobile).toBe(0)
        })

        it('should return control if control is exist', () => {
            const control = component.getControl('name');
            expect(control).toBeTruthy();
        })

        it('should return null if control does not exist', () => {
            const control = component.getControl('invalidName');
            expect(control).toBeNull();
        })

        it('should print value of register form on console', () => {
            spyOn(console, 'log');
            component.registerFn();
            expect(console.log).toHaveBeenCalledWith(component.registerForm.value)
        })
})