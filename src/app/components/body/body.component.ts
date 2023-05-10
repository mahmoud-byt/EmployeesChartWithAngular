import { Component } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { Chart } from 'chart.js/auto';
import  ChartDataLabels from "chartjs-plugin-datalabels";
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  public chart: any;
  receivedEmps:Employee[]=[];
  
receiveEmps(emps:Employee[]){
  this.receivedEmps=Array.from(emps);
  this.createChart(this.receivedEmps);
}
createChart(emps:Employee[]){


  this.chart = new Chart("MyChart", {
    type: 'pie',
    
    data: {
      labels: emps.map(emp=>emp.EmployeeName),
       datasets: [{
         
  label: 'Emplyee',
  data: emps.map(emp=>emp.totalHours),
  backgroundColor: [
    'red',
    'pink',
    'green',
    'yellow',
    'orange',
    'blue',			
    'violet',
    'pink',
    'purple',
    'grey',
    'black'
  ],
  
  hoverOffset: 4
}],
    },
    plugins:[ChartDataLabels],
    options: {
    
      aspectRatio:1.5,
      plugins:{
        legend:{ position:'right'},
        tooltip:{
          enabled:false
        },
        datalabels: {

         color:'white',
         font:{weight:'bold'},
    formatter:(value,ctx)=>{
      const dataPoints=ctx.chart.data.datasets[0].data;
      function totalSum(total:any,dataPoints:any){
        return total+dataPoints;
      }
      const totalValue=dataPoints.reduce(totalSum,0)
      const percebtage=(value*100/totalValue).toFixed(1)
      return percebtage+'%'
    }
      }
    }
  }
  });
}

}
