package com.example.SpringProject.Service;

import com.example.SpringProject.DTO.EmployeeDTO;
import com.example.SpringProject.DTO.EmployeeSaveDTO;
import com.example.SpringProject.DTO.EmployeeUpdateDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmployeeService {
    String addEmployee(EmployeeSaveDTO employeeSaveDTO);

    List<EmployeeDTO> getAllEmployee();

    String updateEmployee(EmployeeUpdateDTO employeeUpdateDTO);

    boolean deleteEmployee(int id);
}
