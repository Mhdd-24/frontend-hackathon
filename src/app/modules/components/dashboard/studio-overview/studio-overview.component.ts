import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DashboardService } from '../services/dashboard.service';
import { DashboardResponse } from '../types/dashboard.model';

@Component({
  selector: 'app-studio-overview',
  templateUrl: './studio-overview.component.html',
  styleUrl: './studio-overview.component.scss'
})
export class StudioOverviewComponent implements OnInit {
  items!: MenuItem[];
  dashboardData !: DashboardResponse;
  todayYears = new Date().getUTCFullYear();
  todayEventCount = 0;
  data: any;
  options: any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {

    this.dashboardService.getDashboardDetails().subscribe({
      next: (data) => {
        this.dashboardData = data;
        console.log(data);
        this.drawGraph();
      },
      error: (error) => {
        console.error(error);
      }
    })

    this.dashboardService.getEventsToday().subscribe({
      next: (data) => {
        this.todayEventCount = data.length;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    })


  }

  drawGraph() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
        labels: this.dashboardData.data.departmentLeaveDtosList.map(x => x.department),
        datasets: [
            {
                type: 'bar',
                label: 'On Leave',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                data: this.dashboardData.data.departmentLeaveDtosList.map(x => x.leaveCount)
            },
            {
                type: 'bar',
                label: 'On Site',
                backgroundColor: documentStyle.getPropertyValue('--green-500'),
                data: this.dashboardData.data.departmentLeaveDtosList.map(x => x.onSiteCount)
            },
            {
                type: 'bar',
                label: 'On WFH',
                backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                data: this.dashboardData.data.departmentLeaveDtosList.map(x => x.wfhCount)
            }
        ]
    };

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false
            },
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
  }

}
