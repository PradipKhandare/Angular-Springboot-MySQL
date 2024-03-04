package com.example.SpringProject.Service;

import com.example.SpringProject.DTO.EmployeeDTO;
import com.example.SpringProject.DTO.EmployeeSaveDTO;
import com.example.SpringProject.DTO.EmployeeUpdateDTO;
import com.example.SpringProject.Entity.Employee;
import com.example.SpringProject.Repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepo employeeRepo;
    @Override
    public String addEmployee(EmployeeSaveDTO employeeSaveDTO) {
        Employee employee = new Employee(
                employeeSaveDTO.getEmployeename(),
                employeeSaveDTO.getEmployeeaddress(),
                employeeSaveDTO.getMobile()
        );
        employeeRepo.save(employee);
        return employee.getEmployeename();
    }

    @Override
    public List<EmployeeDTO> getAllEmployee() {

        List<Employee> getEmployees = employeeRepo.findAll();
        List<EmployeeDTO> employeeDTOList = new ArrayList<>();
        for(Employee e: getEmployees){
            EmployeeDTO employeeDTO = new EmployeeDTO(
                    e.getEmployeeid(),
                    e.getEmployeename(),
                    e.getEmployeeaddress(),
                    e.getMobile()
            );
            employeeDTOList.add(employeeDTO);
        }
        return employeeDTOList;
    }

//    @Override
//    public String updateEmployee(EmployeeUpdateDTO employeeUpdateDTO) {
//        if(employeeRepo.existsById(employeeUpdateDTO.getEmployeeid())){
//            Employee employee = employeeRepo.getReferenceById(employeeUpdateDTO.getEmployeeid());
//            employee.setEmployeename(employeeUpdateDTO.getEmployeename());
//            employee.setEmployeeaddress(employeeUpdateDTO.getEmployeeaddress());
//            employee.setMobile(employeeUpdateDTO.getMobile());
//            employeeRepo.save(employee);
//
//        }else {
//            System.out.println("Employee id not found");
//        }
//        return null;
//    }

    @Override
    public String updateEmployee(EmployeeUpdateDTO employeeUpdateDTO) {
        Optional<Employee> optionalEmployee = employeeRepo.findById(employeeUpdateDTO.getEmployeeid());
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            employee.setEmployeename(employeeUpdateDTO.getEmployeename());
            employee.setEmployeeaddress(employeeUpdateDTO.getEmployeeaddress());
            employee.setMobile(employeeUpdateDTO.getMobile());
            employeeRepo.save(employee);
            return "Employee updated successfully.";
        } else {
            return "Employee id not found";
        }
    }


    @Override
    public boolean deleteEmployee(int id) {

        if(employeeRepo.existsById(id)){
        employeeRepo.deleteById(id);
        }else {
            System.out.println("Employee id is not found.");
        }
        return true;
    }
}
