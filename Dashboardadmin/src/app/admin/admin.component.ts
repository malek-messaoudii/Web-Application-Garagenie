import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }
  currentTime: string = '';
  currentView: string = 'dashboard';
  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.createUsersActivityChart();
    this.createVisitorsChart();
   
  }
  setView(view: string) {
    this.currentView = view;
  }
  createUsersActivityChart(): void {
    const ctx = document.getElementById('usersActivityChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Oct 10', 'Oct 12', 'Oct 14', 'Oct 16'],
        datasets: [{
          label: 'Users',
          data: [30, 60, 90, 60],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createVisitorsChart(): void {
    const ctx = document.getElementById('visitorsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Registered', 'Not Registered'],
        datasets: [{
          label: 'Visitors',
          data: [311, 64],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }
}
