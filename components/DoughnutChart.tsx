'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({accounts}:DoughnutChartProps) => {

    const data={
        datasets:[
            {
                label:'Banks',
                data:[
                    30000,
                    50000,
                    20000
                ],
                backgroundColor:
                [
                    '#0747b6',
                    '#2265d8',
                    '#2f91fa'
                ],
            },
        ],
        labels:['HDFC','ICICI','SBI']
    }

  return (
    <Doughnut 
    data={data} 
    options={
        {
            cutout: '60%',
            plugins:{
                legend:{
                    display:false
                }
            }
        }
    }
    />
  )
}

export default DoughnutChart