import React, { Component } from "react";
import Chart from "react-apexcharts";

class ChartSoldeFinancier extends Component {
  constructor(props) {
    super(props);

    this.state = {
          
      
      width:30,
      options: {
        chart: {
          type: 'area',
          height: 250,
        },
        colors: ['#959da2', '#ab2926'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        
        title: {
          text: 'Equilibre financier',
          align: 'left',
          style: {
            fontSize: '14px'
          }
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
        
          tickAmount: 4,
          floating: false,
        
          labels: {
            style: {
              colors: '#8e8da4',
            },
            formatter: (value) => { return Number((value*100).toFixed(1)) + " %"},
            offsetY: -7,
            offsetX: 0,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100]
          },
          opacity: 0.2
        },
        tooltip: {
          x: {
            format: "yyyy",
          },
          fixed: {
            enabled: false,
            position: 'topRight'
          }
        },
        
        grid: {
          yaxis: {
            lines: {
              offsetX: -30
            }
          },
          padding: {
            left: 20
          }
        }
      },
    
    
    };
  }


  render() {
    return (
      


<div id="chart">
<Chart options={this.state.options} series={this.props.parametresModifies ? [{
        name: 'Simulation du COR avec une r??forme inchang??e',
        data: this.props.soldeFinancierSansReforme
      },
      {
        name: 'Votre r??forme',
        data: this.props.soldeFinancierAvecReforme
      }
        ] : [{
          name: 'Simulation du COR avec une r??forme inchang??e',
          data: this.props.soldeFinancierSansReforme
        }]} type="area" height={350} />
</div>
    );
}
}

export default ChartSoldeFinancier;