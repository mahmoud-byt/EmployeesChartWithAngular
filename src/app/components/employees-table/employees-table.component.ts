
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {
  employees:Employee[]=[];
  @Output() sendemps:EventEmitter<Employee[]>;
  constructor(private empSrvc:EmployeeService){
    this.sendemps=new EventEmitter<Employee[]>;
    
  }

  ngOnInit(): void {
    this.empSrvc.getAllEmployees().subscribe(data=>{  
      var result:Employee[]=[]      
    data.forEach(function(emp:Employee){
      if(result.filter(em=>emp.EmployeeName==em.EmployeeName).length ==0){
        var CalcHours=(new Date(emp.EndTimeUtc!).getTime()-new Date(emp.StarTimeUtc!).getTime())/1000/60/60
        emp={EmployeeName:emp.EmployeeName,totalHours:CalcHours}
        result.push(emp)
      }else{
        var CalcHours=(new Date(emp.EndTimeUtc!).getTime()-new Date(emp.StarTimeUtc!).getTime())/1000/60/60
        result.filter((e=>e.EmployeeName==emp.EmployeeName)).map(em=>em.totalHours+=CalcHours)
      }
    })
    result.map(emp=>emp.totalHours=Math.round(emp.totalHours))
    this.employees=result.sort((a,b)=>b.totalHours-a.totalHours);
    this.sendemps.emit(this.employees);
    })
    
  }
}
